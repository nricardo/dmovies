routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('movies', {
      url: '/movies',
      template: require('./movies.html'),
      controller: 'MoviesController',
      controllerAs: 'movies'
    });
}
