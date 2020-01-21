import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';

import './index.css';

import Root from './root';
import fbConfig from './config';
import rootReducer from './store/reducers/rootReducers';

firebase.initializeApp(fbConfig)
firebase.firestore();
// firebase.firestore().settings({timestampsInSnapshots: true});

// react-redux-firebase options
const config = {
  enableLogging: false, // enable/disable Firebase's database logging
  attachAuthIsReady: true
}

// Add redux Firebase to compose
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(firebase, config),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

store.firebaseAuthIsReady.then(() => {
  render(
    <Root store={store} />,
    document.getElementById('root')
  );  
});
