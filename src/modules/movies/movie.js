import {Component, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from 'services/TMDBService';

export default SetModule('dMovies.movie', [uirouter]).name;

@Inject(['$scope', '$injector'])
@Component({ selector: 'movie' })
@State({
  name: 'movie',
  url: '/movie/:id',
  controllerAs: 'vm',
  controller: MovieController,
  template: require('./movie.html'),
  stylesheet: require('./movie.scss')
})

class MovieController
{
  tmdbService:TMDBService;

  constructor ($scope, $injector) {
    this.$scope = $scope;
    this.$http = $injector.get('$http');
    this.$params = $injector.get('$stateParams');
    this.$location = $injector.get('$location');
    this.tmdbService = $injector.get('tmdbService');

    // setup firebase references
    let ref = firebase.database().ref('movies/' + this.$params['id']);

    // load movie info
    ref.once('value').then(data => {
      this.movie = data.val();
      this.$scope.$apply();
    });
  }

  fetch() {
    console.log('Fetch info form TMDB API for movie: ', this.movie.name);

    this.tmdbService.search('movie', {title: this.movie.name}).then(movies => {
      console.log(movies);
      this.movies = movies;
    });
  }
}
