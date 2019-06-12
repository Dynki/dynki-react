import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import domainReducer from './domainReducer';
import baseReducer from './baseReducer';
import coreReducer from './coreReducers';

// Add firebase to reducers
const rootReducer = combineReducers({
  base: baseReducer,
  auth: authReducer,
  boards: boardReducer,
  firebase: firebaseReducer,
  domain: domainReducer,
  core: coreReducer
})

export default rootReducer;