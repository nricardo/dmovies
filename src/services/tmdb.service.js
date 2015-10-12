/**
  * The Movie Database REST Service
  * @author: Nelson Ricardo
  * @description: AngularJS service using $resource for TMDB REST api v3
  *
  * API key: dc4940972c268b026150cf7be6f01d11
  **/

'use strict';

import {Inject, Service} from 'angular2-now';

@Service('tmdbService')
@Inject(['$http'])
class TmdbService
{
  constructor ($http) {
    this.$http = $http;

    this.url = TmdbService.API_URL;
    this.key = TmdbService.API_KEY;
  }

  search(entity, query) {
    console.log('Searching ' + entity + ' for "' + query + '"');

    // make the call the api
    return this.$http.get(this.url + '/search/' + entity, {
      api_key: this.key,
      query: query
    })
  }
}

TmdbService.API_URL = 'http://api.themoviedb.org/3';
TmdbService.API_KEY = 'dc4940972c268b026150cf7be6f01d11';

export default TmdbService;
