// import external modules
import {Service, SetModule} from 'ng2now';

// import Firebase
import firebase from 'firebase';

// define this module
SetModule('dMovies.dbService', []);

@Service('dbService')
export class DbService
{
  constructor () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBsSEff7YV38mHii3l1R92BYQibA6EPbws",
      authDomain: "dmovies.firebaseapp.com",
      databaseURL: "https://dmovies.firebaseio.com",
      storageBucket: "firebase-dmovies.appspot.com",
    };

    firebase.initializeApp(config);
  }

  getDatabase() {
    return firebase.database();
  }
}
