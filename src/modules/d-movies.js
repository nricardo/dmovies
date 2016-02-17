'use strict';

import {Component, View, SetModule} from 'angular2-now';

// import external modules
import home from 'home';
import movies from 'movies';
import movie from 'movies/movie';

export default SetModule('d-movies', ["firebase", home, movie, movies]).name;

@Component({ selector: 'd-movies' })
@View({ template: '<ui-view></ui-view>'})

export class dMovies {
  constructor () {
    console.info('dMovies starting...');
  }
}
