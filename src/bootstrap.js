'use strict';

import angular from 'angular';
import angular2now from 'angular2-now';

// make angular2-now stuff available everywhere
angular.extend(window, angular2now);
angular2now.options({ controllerAs: 'vm' })

// load app's stylesheet
import './bootstrap.scss';

// import external modules
import home from './modules/home';
import movies from './modules/movies';

SetModule('d-movies', [home, movies]);

@Component({ selector: 'd-movies' })
@View({ template: '<ui-view></ui-view>' })
class dMovies {
  constructor () {
    console.info('dMovies starting...');
  }
}

bootstrap(dMovies);
