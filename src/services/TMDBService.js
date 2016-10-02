/**
  * The Movie Database REST Service
  * @author: Nelson Ricardo
  * @description: AngularJS service using $resource for TMDB REST api v3
  *
  **/

'use strict';

import {Inject, Service} from 'angular2-now';

import Bottleneck from 'bottleneck';

@Inject(['$q', '$http'])
@Service('tmdbService')
class TMDBService
{
  constructor ($q, $http) {
    this.$q = $q;
    this.$http = $http;
    this.limiter = new Bottleneck(1, TMDBService.INTERVAL / TMDBService.LIMIT);

    // setup api endpoint and key
    this.url = TMDBService.API_URL;
    this.key = TMDBService.API_KEY;

    // get configuration
    this.config().then(response => this.config = response.data);
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
    let params = { query: query, api_key: this.key };

    // merge options into params
    params = angular.merge(params, options);

    // setup url for this query
    let url = this.url + '/search/' + entity;

    return this.limiter.schedule(() => {
      return this.$http.get(url, {params: params}).then(
        (response, status, headers, config) => response.data.results
      );
    });
  }

  getBackdropUrl(path) {
    return "".concat(this.config.images.base_url, "original", path);
  }

  getPosterUrl(path) {
    // for now the same as backdrop..
    return this.getBackdropUrl(path);
  }
}

TMDBService.LIMIT = 40; // limit of API requests
TMDBService.INTERVAL = 10000; // 10sec between max. requests
TMDBService.API_URL = 'http://api.themoviedb.org/3';
TMDBService.API_KEY = 'f7f51775877e0bb6703520952b3c7840';

export default TMDBService;
