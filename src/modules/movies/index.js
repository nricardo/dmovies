'use strict';

import path from 'path';

import uirouter from 'angular-ui-router';
import {Controller, Inject, State, SetModule} from 'angular2-now';

import movie from './movie';
import {TMDBService} from '../../services/TMDBService';

export default SetModule('dMovies.movies', [uirouter, movie]).name;

@Inject(['$scope', '$http', 'tmdbService'])
@Controller({name: 'moviesController'})
@State({ name: 'movies', url: '/movies', template: require('./movies.html'), stylesheet: require('./movies.scss') })

class MoviesController
{
  tmdbService:TMDBService;

  constructor ($scope, $http, tmdbService) {
    this.$scope = $scope;
    this.$http = $http;
    this.tmdbService = tmdbService;

    // init movies collection
    this.collection = [];

    $scope.vm = this;

    this.load();
  }

  load() {
    // load current list of movies from file system...
    this.$http.get('/data/movies').then(response => {
      // search each one of them....
      response.data.replace(/^\s+|\s+$/g, '').split('\n').map(movie => {
        // splits movie title name into real title and year
        let matches = movie.match(/(.+) \((\d+)\)/);

        // get movie title and year from the split
        let title = matches[1];
        let year  = matches[2];

        // run the search...
        this.tmdbService.search('movie', title, {year: year}).then(movies => {
          this.collection.push({title: title, movies: movies});
        });
      });
    });
  }

  search () {
    // make the search using TMDB api
    this.tmdbService.search('movie', this.query).then(movies => this.movies = movies);
  }
}
