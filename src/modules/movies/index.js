'use strict';

import uirouter from 'angular-ui-router';
import {Controller, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from '../../services/TMDBService';

export default SetModule('dMovies.movies', [uirouter]).name;

@Inject(['$scope', '$injector'])
@Controller({name: 'moviesController'})
@State({ name: 'movies', url: '/movies', template: require('./movies.html'), stylesheet: require('./movies.scss') })

class MoviesController
{
  tmdbService:TMDBService;

  constructor ($scope, $injector) {
    this.$scope = $scope;
    this.$http = $injector.get('$http');
    this.$location = $injector.get('$location');
    this.$firebase = $injector.get('$firebaseArray');
    this.tmdbService = $injector.get('tmdbService');

    $scope.vm = this;

    // setup firebase reference
    let movies = new Firebase('https://dmovies.firebaseio.com/movies');

    // load collection of movies
    this.movies = this.$firebase(movies);
  }

  show (movie) {
    this.$location.path('/movie/' + movie.$id);
  }

  search () {
    // make the search using TMDB api
    this.tmdbService.search('movie', this.query).then(movies => this.movies = movies);
  }
}
