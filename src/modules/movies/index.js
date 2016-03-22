'use strict';

import uirouter from 'angular-ui-router';
import {Controller, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from '../../services/TMDBService';
import {FirebaseService} from '../../services/FirebaseService';

export default SetModule('dMovies.movies', [uirouter]).name;

@Inject(['$scope', '$injector'])
@Controller({name: 'moviesController'})
@State({ name: 'movies', url: '/movies', template: require('./movies.html'), stylesheet: require('./movies.scss') })
@State({ name: 'movie', url: '/movie/:id', template: require('./movie.html'), stylesheet: require('./movie.scss') })

class MoviesController
{
  tmdbService:TMDBService;
  firebaseService:FirebaseService;

  constructor ($scope, $injector) {
    this.$scope = $scope;
    this.$http = $injector.get('$http');
    this.$location = $injector.get('$location');
    this.tmdbService = $injector.get('tmdbService');
    this.firebaseService = $injector.get('firebaseService');

    $scope.vm = this;

    // setup firebase reference
    let ref = new Firebase('https://dmovies.firebaseio.com/movies');

    // load collection of movies
    this.movies = this.firebaseService.fetch(ref);
  }

  show (movie) {
    this.$location.path('/movie/' + movie.$id);
  }

  search () {
    // make the search using TMDB api
    this.tmdbService.search('movie', this.query).then(movies => this.movies = movies);
  }
}
