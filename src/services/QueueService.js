
'use strict';

import {Inject, Service} from 'angular2-now';

@Inject(['$q', '$http'])
@Service('queueService')
class QueueService
{
  constructor ($q, $http) {
    console.log('QueueService::constructor()');

    this.$q = $q;
    this.$http = $http;

    // requests queue
    this.queue = [];

    // number pending requests
    this.pending = 0;

    // triggers callback whenever the queue changes
    Array.observe(this.queue, this.process.bind(this));
  }

  process() {
    // check if we're in good condition to proceed
    if (this.pending >= QueueService.LIMIT) return;

    // process the queue
    if (this.queue.length > 0) {

      // get item on queue
      let {request, deferred} = this.queue[0];
      console.log(request, deferred);

      // increment requests being processed
      this.pending++;

      // make the call...
      this.$http.get(request.url, {params: request.params}).then(response => {
        console.log('Response: ', response);
        // got an answer, so decrement
        this.pending--;
        this.queue.shift();

        // resolve the deferred promise
        deferred.resolve(response);
      });
    }
  }

  inject(request) {
    let deferred = this.$q.defer();

    // inject request into queue
    this.queue.push({request, deferred});

    // return the promise
    return deferred.promise;
  }
}

// define our queue limit
QueueService.LIMIT = 40;
