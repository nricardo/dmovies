'use strict';

// import AngularJS
//import angular from 'angular';
import angular2now from 'angular2-now';

// import Firebase and AngularFire
//import firebase from 'firebase';
//import angularfire from 'angularfire';

// make angular2-now stuff available everywhere
angular.extend(window, angular2now);
angular2now.options({ controllerAs: 'vm' })

// load app's stylesheet
import 'stylesheets/d-movies.scss';

// load top level component (main)
import {dMovies} from 'd-movies';

bootstrap(dMovies);
