'use strict';

import './bootstrap.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import {SetModule, Component, View} from 'angular2-now';

// import configuration stuff
import routing from './config/routing';

// import app's external modules
import home from './modules/home';

// bootstrap the app
angular.element(document).ready(function () {
  angular.bootstrap(
    document,
    [angular.module('app', [
      home])
    .config(routing)
    .name]);
});
