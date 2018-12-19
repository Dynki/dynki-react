import notifiy from '../../shell/components/Notification';

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      console.log('Logging in');
      const firebase = getFirebase();

      dispatch({ type: 'ATTEMPT_LOGIN' })
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        console.log('Login Success');
        dispatch({ type: 'LOGIN_SUCCESS' });
        
      }).catch((err) => {
        console.log('Login Error');
        dispatch({ type: 'LOGIN_ERROR', err });
        notifiy({ type: 'warning', message: 'Login Failure', description: err.message })
      });
  
    }
  }

  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
    }
  }