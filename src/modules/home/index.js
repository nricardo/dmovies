// import external modules
import {State, SetModule} from 'ng2now';

// define this module
SetModule('dMovies.home', []);

@State({
  url: '/home',
  name: 'home',
  otherwise: true,
  controllerAs: 'vm',
  controller: HomeController,
  template: require('./home.html'),
  // resolve: {
  //   user: ($q, $timeout, $state, authService) =>
  //     authService.getUser().catch(() => $timeout(() => $state.go('login')))
  // }
})
class HomeController {}
