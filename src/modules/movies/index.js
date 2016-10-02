'use strict';

// import external modules
import {Controller, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from 'services/TMDBService';

export default SetModule('dMovies.movies', [])
.config(($stateProvider) => {
  $stateProvider
  .state('movies', {
    url: '/movies',
    template: '<ui-view />',
    controllerAs: 'vm',
    controller: MoviesController,
    style: require('./movies.scss'),
  })
  .state('movies.list', {url: '/', template: require('./movies.html')})
  .state('movies.item', {url: '/{id}', template: require('./movie.html')});
})
.name;

@Inject(['$scope', '$injector'])
@Controller({name: 'moviesController'})
class MoviesController {
  movies:Array;
  tmdbService:TMDBService;

  constructor ($scope, $injector) {
    this.$scope = $scope;
    this.$q = $injector.get('$q');
    this.$state = $injector.get('$state');
    this.$params = $injector.get('$stateParams');
    this.tmdbService = $injector.get('tmdbService');

    // init movie collection
    this.movies = [];
    this.moviesNotScrapped = 0;

    // start things up!
    this.init();
  }

  init() {
    // setup firebase reference
    this.dbMovies = firebase.database().ref().child('movies');

    let loadMovies = (data) => {
      // list of movies from DB
      let movies = data.val();

      // number of movies not scrapped yet
      this.moviesNotScrapped = movies.reduce((n, m) => m.id ? n : (n+1), 0);

      // let Angular know about this assignment
      this.$scope.$apply(() => this.movies = movies);
    };

    // load collection of movies
    this.dbMovies.limitToFirst(40).on('value', loadMovies);
  }

  show(movie) {
    // get movie id
    let id = movie.id || 0;

    // get a DB reference for this movie
    this.dbMovie = this.dbMovies.child(id);

    // read stored data
    this.dbMovie.on('value', data => {
      this.movie = data.val();
      this.$state.go('movies.detail', {id: id});
    });
  }

  scrapeAll() {
    let queries = [];

    // cycle through all movies
    this.movies.map((movie, index) => {
      // skip scrapping if we've got already an id attached
      if (movie.id) return null;

      // ask metadata form this movie
      this.scrape(movie).then(metadata => {
        if (metadata) this.$scope.$apply(() => this.movies[index] = metadata);
      })
    });
  }

  // scrapes a movie
  scrape(movie):Promise {
    // scrape movie metadata
    return this.tmdbService.search('movie', movie.title, {year: movie.year}).then(result => {
      // check if there's any match
      if (result.length === 0) return null;

      // filter by language ('en')
      result = result.filter(m => m.original_language === 'en');

      // just assume the first entry as our movie
      let metadata = result[0];

      // get only the needed info
      metadata = {
        id:       metadata.id,
        title:    metadata.original_title,
        date:     metadata.release_date,
        tagline:  metadata.tagline || '',
        overview: metadata.overview,
        poster:   this.tmdbService.getPosterUrl(metadata.poster_path),
        fanart:   this.tmdbService.getBackdropUrl(metadata.backdrop_path),
      };

      return metadata;
    });
  }
}
