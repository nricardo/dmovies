// import UI Router
import '@uirouter/angularjs';

// import external modules
import {Component, Inject, SetModule} from 'ng2now';

// import app's services
import '../services/AuthService';
import '../services/DBService';
import '../services/TMDBService';

// import our own modules
import '../modules/home';
import '../modules/login';
import '../modules/movies';

// define this module
SetModule('d-movies', ['ui.router', 'dMovies.authService', 'dMovies.dbService', 'dMovies.tmdbService', 'dMovies.home', 'dMovies.movies'])
.run($rootScope => {
  $rootScope.$on('$stateChangeStart', (event, state) => {
    console.log(event, state);
  });
});

@Component({
  selector: 'd-movies',
  template: '<ui-view />',
  style: require('./d-movies.scss'),
})
export class dMovies {
  constructor () {
    console.info('dMovies starting...');
  }
}
