'use strict';

import angular from 'angular';
import {bootstrap, Component, SetModule} from 'angular2-now';

// import configuration stuff
//import routing from './config/routing';

// import app's external modules
//import home from './modules/home';
//import movies from './modules/movies';

// load app's stylesheet
import './bootstrap.scss';



//angular.module('dMovie');

//SetModule('dMovies');
//@Component({name: 'dMovies'})
//class dMovies {}

// bootstrap the app
//bootstrap(dMovies);
/*
angular.element(document).ready(function () {
  angular.bootstrap(
    document,
    [angular.module('dMovies', [home])
    .config(routing)
    .name]);
});

angular2now.options({ controllerAs: 'controller' });
*/

import angular2now from 'angular2-now';

angular.extend(window, angular2now);
angular2now.options({ controllerAs: 'vm' })

angular.module('todo-app', []);

@Component({ selector: 'todo-app' })
@View({ templateUrl: 'client/components/app.html' })
class TodoApp { }

bootstrap(TodoApp);
