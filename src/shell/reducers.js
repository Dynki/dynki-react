import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})

export default rootReducer;