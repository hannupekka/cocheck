// @flow
import config from 'constants/config';

const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  databaseURL: config.firebaseDatabaseURL,
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;
