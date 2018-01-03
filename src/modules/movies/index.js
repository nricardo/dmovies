// import external modules
import {Observable} from 'rxjs/Observable';
import infiniteScroll from 'ng-infinite-scroll';
import {Inject, State, SetModule} from 'ng2now';

SetModule('dMovies.movies', [infiniteScroll])
.config(($stateProvider) => {
  $stateProvider
  .state('movies', {
    url: '/movies',
    abstract: true,
    template: '<ui-view />',
    controllerAs: 'vm',
    controller: MoviesController,
    style: require('./movies.scss'),
  })
  .state('movies.list', {url: '/', template: require('./movies.html')})
  .state('movies.item', {url: '/{id}', template: require('./movie.html')});
});

@Inject(['$injector'])
class MoviesController {
  constructor ($injector) {
    this.$q = $injector.get('$q');
    this.$state = $injector.get('$state');
    this.$params = $injector.get('$stateParams');
    this.$timeout = $injector.get('$timeout');
    this.dbService = $injector.get('dbService');
    this.tmdbService = $injector.get('tmdbService');

    // start things up!
    this.init();
  }

  init() {
    // init
    this.done = false;
    this.offset = null;
    this.loading = false;

    // init collection
    this.movies = {};

    // setup firebase reference
    this.dbMovies = this.dbService.getDatabase().ref('movies');
  }

  fetch() {
    const ref = this.offset ? this.dbMovies.startAt(null, this.offset) : this.dbMovies.limitToFirst(MoviesController.ITEMS + 1);
    return Observable.create(observer => {
      ref.once('value', snapshot => {
        snapshot.forEach(item => observer.next({
          key: item.key,
          value: item.val()
        }));
        observer.complete();
      });
    });
  }

  load() {
    // signal flag that we're going to load data
    this.loading = true;

    // act when data arrives
    this.fetch().subscribe(data => {
      // keep track of key
      this.offset = data.key;

      // inject into collection
      this.movies[data.key] = data.value;
    }, null, () => {
      // remove last item (this item is just for control)
      delete this.movies[this.offset];

      // check if we've got all items
      //this.done = snapshot.numChildren() < MoviesController.ITEMS;

      // tell Angular that something changed
      this.$timeout(() => this.loading = false);
    });
  }

  show(key) {
    console.log(key)
    // get a DB reference for this movie
    this.dbMovie = this.dbMovies.child(key);

    // read stored data
    this.dbMovie.on('value', data => {
      this.movie = data.val();
      this.$state.go('movies.item', {id: key});
    });
  }

  scrape() {
    // cycle through all movies
    for (let key in this.movies) {
      // get movie Object
      let movie = this.movies[key];

      // skip scrapping if we've got already an id attached
      if (movie.id) continue;

      // ask metadata for this movie
      this.scrape(movie).then(metadata => {
        // -- save into DB
        metadata && this.$timeout(() => {
          this.movies[key] = metadata;
          this.dbMovies.child(key).update(metadata).then(x => console.log('saved:', x));
        });
      });
    };
  }

  getBackdropUrl(path) {
    return this.getBackdropUrl(path);
  }

  getPosterUrl(path) {
    let baseImagesPath = this.tmdbService.getConfig('images.base_url');

    // just assuming 150px wide posters, for now...
    return "".concat(baseImagesPath, "w150", path);
  }
}

MoviesController.ITEMS = 20;