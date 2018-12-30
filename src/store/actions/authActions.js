import notifiy from '../../components/notifications/Notification';

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log('Logging in');
    const firebase = getFirebase();

    dispatch({ type: 'ATTEMPT_LOGIN' })

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      console.log('Login Success');

      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirm the user is an Admin.
          if (idTokenResult.claims.domainId) {
            dispatch({ type: 'SET_DOMAIN' }, idTokenResult.claims.domainId);
            dispatch({ type: 'LOGIN_SUCCESS' });
          } else {
            dispatch({ type: 'NO_DOMAIN' });
            dispatch({ type: 'LOGIN_SUCCESS' });
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }).catch((err) => {
      console.log('Login Error');
      dispatch({ type: 'LOGIN_ERROR', err });
      notifiy({ type: 'warning', message: 'Login Failure', description: err.message })
    });

  }
}

export const signUp = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: 'ATTEMPT_SIGNUP' })
    console.log('Signing Up', credentials);

    firebase.auth().createUserWithEmailAndPassword(
      credentials.userName,
      credentials.password
    ).then(() => {
      console.log('SIGNUP Success');

      firebase.auth().currentUser.reload();
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
        notifiy({ type: 'success', message: 'Please Verify Account', description: 'Please check your email to verify your account' })
        })
      .catch((err) => {
        console.log('Verification Error');
        dispatch({ type: 'VERIFICATION_ERROR', err });
        notifiy({ type: 'warning', message: 'Verification Failure', description: err.message })
      })

    }).catch((err) => {
      console.log('Sign up Error');
      dispatch({ type: 'SIGNUP_ERROR', err });
      notifiy({ type: 'warning', message: 'Sign up Failure', description: err.message })
    });

  }
}


export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    })
  }
}

export const setDomain = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        if (idTokenResult.claims.domainId) {
          dispatch({ type: 'SET_DOMAIN', payload: idTokenResult.claims.domainId });
        } else {
          dispatch({ type: 'NO_DOMAIN' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}