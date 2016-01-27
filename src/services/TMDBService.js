/**
  * The Movie Database REST Service
  * @author: Nelson Ricardo
  * @description: AngularJS service using $resource for TMDB REST api v3
  *
  * API key: 57983e31fb435df4df77afb854740ea9

  **/

'use strict';

import {Inject, Service} from 'angular2-now';

import {QueueService} from './QueueService';

@Inject(['$q', '$http', '$interval', 'queueService'])
@Service('tmdbService')
class TMDBService
{
  constructor ($q, $http, $interval, queueService) {
    console.log('TMDBService::constructor()');

    this.$q = $q;
    this.$http = $http;
    this.$interval = $interval;

    // the requests queue
    this.queue = [];

    this.pending = 0;

    // setup api endpoint and key
    this.url = TMDBService.API_URL;
    this.key = TMDBService.API_KEY;

    // get configuration
    this.config().then(config => this.config = config);
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

    // build request
    let request = {url: url, params: params};

    // inject request into processing queue
    return this.process(request);
  }

  process(request) {
    return this.$http.get(request.url, {params: request.params}).then(
      (response, status, headers, config) => response.data.results
    );
  }
}

//TMDBService.LIMIT = 40; // limit of API requests
TMDBService.API_URL = 'http://api.themoviedb.org/3';
TMDBService.API_KEY = '57983e31fb435df4df77afb854740ea9';

export default TMDBService;
