import {Controller, Inject, SetModule} from 'angular2-now';

SetModule('dMovies')
@State({name: 'home'})
@Controller({name: 'home'})

class Home
{
  constructor () {}
}

export default 'Home';
