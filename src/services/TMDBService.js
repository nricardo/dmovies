/**
  * The Movie Database REST Service
  * @author: Nelson Ricardo
  * @description: AngularJS service using $resource for TMDB REST api v3
  *
  * API key: 57983e31fb435df4df77afb854740ea9

  **/

'use strict';

import {Inject, Service} from 'angular2-now';

@Inject(['$q', '$http'])
@Service('tmdbService')
class TMDBService
{
  constructor ($q, $http) {
    console.log('TMDBService::constructor()');

    this.$q = $q;
    this.$http = $http;

    // setup api endpoint and key
    this.url = TMDBService.API_URL;
    this.key = TMDBService.API_KEY;

    // prepare requests queue
    this.queue = [];

    // number of requests
    this.requests = [];

    // get API's config data
    this.config().then(response => { this.config = response.data; });
  }

  config() {
    // get configuration data
    return this.$http({
      method: 'GET',
      url: this.url + '/configuration',
      params: { api_key: this.key }
    });
  }

  search(entity, query, options) {
    // check passed options
    options = options || {};

    // setup parameters
    let params = { query: encodeURIComponent(query), api_key: this.key };

    // merge options into params
    params = angular.merge(params, options);

    // setup url for this query
    let url = this.url + '/search/' + entity;

    // prepare promise
    let deferred = this.$q.defer();

    // inject request into processing queue
    this.queue.push({url: url, params: params});

    // process queue
    while (this.queue.length > 0) {
      if (this.requests.length >= 40) {
        let request = this.requests.pop();

        let response = this.$http.get(request.url, {params: request.params}).then(response => {
          return response.data.results.map(movie => {
            movie.poster = movie.poster_path ? this.config.images.base_url + '/w92/' + movie.poster_path : 'https://placehold.it/92x138';

            return movie;
          })
        });

        deferred.resolve(response);
      }
      else {
        let request = this.queue.pop();

        this.requests.push(request);
      }
    }

    return deferred.promise;
  }
}

TMDBService.API_URL = 'http://api.themoviedb.org/3';
TMDBService.API_KEY = '57983e31fb435df4df77afb854740ea9';

export default TMDBService;
