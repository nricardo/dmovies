import {Controller, Inject} from 'angular2-now';

import {TmdbService} from '../../services/tmdb.service';

@Inject(['$scope', 'tmdbService'])
@Controller({name: 'moviesController'})
class MoviesController
{
  constructor ($scope, tmdbService)
  {
    this.$scope = $scope;
    this.tmdbService = tmdbService;
    this.test = "dasd";
    $scope.controller = this;
  }

  search()
  {
    console.log('search...', this.query);
  }
}

export default MoviesController;
