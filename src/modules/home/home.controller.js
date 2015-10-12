import {Controller, Inject, SetModule} from 'angular2-now';

SetModule('app')
@Controller({name: 'homeController'})
class HomeController
{
  constructor () {}
}

console.log(HomeController)

export default HomeController;
