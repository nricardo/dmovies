import uirouter from 'angular-ui-router';
import {Controller, Inject, State, SetModule} from 'angular2-now';

import {TMDBService} from '../../services/TMDBService';

export default SetModule('dMovies.movies', [uirouter]).name;

@Inject(['$scope', 'tmdbService'])
@Controller({name: 'moviesController'})
@State({ name: 'movies', url: '/movies', template: require('./movies.html') })

class MoviesController
{
  constructor ($scope, tmdbService)
  {
    this.$scope = $scope;
    $scope.vm = this;

    this.tmdbService = tmdbService;
  }

  search()
  {
    // make the search using TMDB api
    this.tmdbService.search('movies', this.query).then(result => {
      console.log(result);
    });
  }
}
