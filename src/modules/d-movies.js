'use strict';

// import external modules
import uirouter from 'angular-ui-router';
import {Component, View, SetModule} from 'angular2-now';

// import our own modules
import home from 'home';
import movies from 'movies';

// define this module
export default SetModule('d-movies', ['ui.bootstrap', uirouter, home, movies]).name;

@Component({ selector: 'd-movies' })
@View({ template: '<ui-view></ui-view>'})

export class dMovies {
  constructor ($injector) {
    console.info('dMovies starting...');

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBsSEff7YV38mHii3l1R92BYQibA6EPbws",
      authDomain: "dmovies.firebaseapp.com",
      databaseURL: "https://dmovies.firebaseio.com",
      storageBucket: "firebase-dmovies.appspot.com",
    };

    firebase.initializeApp(config);
  }
}
