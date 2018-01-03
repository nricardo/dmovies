// import external modules
import {Inject, State, SetModule} from 'ng2now';

// define this module
SetModule('dMovies.login', []);

@Inject(['authService'])
@State({
  url: '/login',
  name: 'login',
  controllerAs: 'vm',
  controller: LoginController,
  template: require('./login.html'),
})
class LoginController {
  constructor(authService) {
    this.authService = authService;
    console.log(' - module "login" running...');
  }

  login(credentials) {
    this.authService.authenticate(credentials).then(response => {
      console.info('SUCCESS:', response.data);
    }).catch(response => {
      console.error('FAILED (%s): %s', response.status, response.statusText);
    });
  }
}
