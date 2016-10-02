'use strict';

// import external modules
import {Controller, State, SetModule} from 'angular2-now';

// define this module
export default SetModule('dMovies.home', []).name;

@Controller({name: 'homeController'})
@State({ name: 'home', url: '/', defaultRoute: true, template: require('./home.html') })

class HomeController {}
