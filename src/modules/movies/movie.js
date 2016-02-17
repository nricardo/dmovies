'use strict';

import uirouter from 'angular-ui-router';
import {Controller, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from '../../services/TMDBService';

export default SetModule('dMovies.movie', [uirouter]).name;

@Inject(['$scope', '$injector'])
@Controller({name: 'movieController'})
@State({ name: 'movie', url: '/movie/:id', template: require('./movie.html'), stylesheet: require('./movie.scss') })

class MovieController
{
  tmdbService:TMDBService;

  constructor ($scope, $injector) {
    this.$scope = $scope;
    this.$http = $injector.get('$http');
    this.$params = $injector.get('$stateParams');
    this.$location = $injector.get('$location');
    this.$firebase = $injector.get('$firebaseObject');
    this.tmdbService = $injector.get('tmdbService');

    $scope.vm = this;

    // setup firebase references
    let movie = new Firebase('https://dmovies.firebaseio.com/movies/' + this.$params['id']);

    // load movie info
    this.movie = this.$firebase(movie);
  }

  fetch() {
    console.log('Fetch info form TMDB API for movie: ', this.movie.name);

    this.tmdbService.search('movie', {title: this.movie.name}).then(movies => {
      console.log(movies);
      this.movies = movies;
    });
  }
}
