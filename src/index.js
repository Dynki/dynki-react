import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { compose, createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import Root from './root';
import fbConfig from './config';
import rootReducer from './shell/reducers';

firebase.initializeApp(fbConfig)

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer)
  
render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
