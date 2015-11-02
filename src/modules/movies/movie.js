'use strict';

import {Component, SetModule, View} from 'angular2-now';

export default SetModule('movie', []).name;

@Component({
  restrict: 'E',
  selector: 'movie',
  bind: {
    movie: '@'
  }
})
@View({ template: require('./movie.html') })
class Movie {}
