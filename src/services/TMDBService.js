/**
 * The Movie Database REST Service
 * @author: Nelson Ricardo
 * @description: AngularJS service using $resource for TMDB REST api v3
 */

// import external modules
import Bottleneck from 'bottleneck';
import {Inject, Service, SetModule} from 'ng2now';

// define this module
SetModule('dMovies.tmdbService', []);

@Inject(['$q', '$http'])
@Service('tmdbService')
export class TMDBService
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

  fetch(url, params) {
    params = params || {};
  }

  config() {
    // setup URL for config
    let url = this.url + '/configuration';

    // and its params...
    let params = { api_key: this.key };

    // get configuration data
    return this.$http.get(url, { params: params });
  }

  getConfig(param) {
    param = param || null;
    param = param.split('.');

    // find config value
    let config = param.reduce((a, p) => a[p], this.config);

    // get config data
    return param ? config : this.config;
  }

  // scrapes a movie
  scrape(movie) {
    // scrape movie metadata
    return this.tmdbService.search('movie', movie.title, {year: movie.year}).then(result => {
      console.log('scraped movie: ', movie.title, result);

      // check if there's any match
      if (result.length === 0) return null;

      // filter by language ('en')
      result = result.filter(m => m.original_language === 'en');

      // just assume the first entry as our movie
      let metadata = result[0];

      // get only the needed info
      metadata = {
        id:       metadata.id,
        title:    metadata.original_title,
        date:     metadata.release_date,
        tagline:  metadata.tagline || '',
        overview: metadata.overview,
        poster:   metadata.poster_path,
        fanart:   metadata.backdrop_path,
      };

      return metadata;
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
}

TMDBService.LIMIT = 40; // limit of API requests
TMDBService.INTERVAL = 10000; // 10sec between max. requests
TMDBService.API_URL = 'https://api.themoviedb.org/3';
TMDBService.API_KEY = 'ecbc86c92da237cb9faff6d3ddc4be6d';
