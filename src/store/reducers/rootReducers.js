import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';
import boardReducer from './boardReducer';

// Add firebase to reducers
const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
  firebase: firebaseReducer
})

export default rootReducer;