/**
  * The Movie Database REST Service
  * @author: Nelson Ricardo
  * @description: AngularJS service using $resource for TMDB REST api v3
  *
  * API key: dc4940972c268b026150cf7be6f01d11
  **/

'use strict';

import {Inject, Service} from 'angular2-now';

@Inject(['$http'])
@Service('tmdbService')
class TMDBService
{
  constructor ($http) {
    this.$http = $http;

    this.url = TMDBService.API_URL;
    this.key = TMDBService.API_KEY;
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

TMDBService.API_URL = 'http://api.themoviedb.org/3';
TMDBService.API_KEY = 'dc4940972c268b026150cf7be6f01d11';

export default TMDBService;
