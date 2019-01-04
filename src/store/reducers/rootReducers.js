import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import domainReducer from './domainReducer';

// Add firebase to reducers
const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
  firebase: firebaseReducer,
  domain: domainReducer
})

export default rootReducer;