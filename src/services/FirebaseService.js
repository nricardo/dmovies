/**
  * Firebase Service wrapper
  * @author: Nelson Ricardo
  * @description: AngularJS service wrapper for Firebase DB
  *
  **/

'use strict';

import {Inject, Service} from 'angular2-now';

@Inject('$injector')
@Service('firebaseService')
class FirebaseService
{
  constructor ($injector) {
    this.$q = $injector.get('$q');
    this.$array = $injector.get('$firebaseArray');
    this.$object = $injector.get('$firebaseObject');
  }

  fetch(ref):Promise {
    return this.$array(ref);
  }
}

export default FirebaseService;
