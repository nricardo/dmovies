import uirouter from 'angular-ui-router';
import {Controller, State, SetModule} from 'angular2-now';

import a from '../../components/a';
import b from '../../components/b';

export default SetModule('dMovies.home', [uirouter]).name;

@Controller({name: 'homeController'})
@State({ name: 'home', url: '/', defaultRoute: true, template: require('./home.html') })

class HomeController {}
