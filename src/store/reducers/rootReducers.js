import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';

// Add firebase to reducers
const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
})

export default rootReducer;