// import external modules
import {Inject, Service, SetModule} from 'ng2now';

// define this module
SetModule('dMovies.authService', []);

@Inject(['$q', '$http'])
@Service('authService')
export class AuthService
{
  constructor ($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  /**
   * authenticate
   *
   * @description Sends credentials to authentication
   * server in order to obtain an access/refresh token from it.
   * @param {credentials} - Object containing `username` and `password` fields.
   */
  authenticate(credentials) {
    return this.$http.post('//localhost:8000/auth/token', credentials || {});
  }

  getUser() {
    return this.$http.get('//localhost:8000/auth/user');
  }
}