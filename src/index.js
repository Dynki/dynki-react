import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { compose, createStore, applyMiddleware } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import Root from './root';
import fbConfig from './config';
import rootReducer from './store/reducers/rootReducers';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';

firebase.initializeApp(fbConfig)

// react-redux-firebase options
const config = {
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(firebase, config),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
