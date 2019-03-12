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

      dispatch({ type: 'SET_CURRENT_USER', payload: firebase.auth().currentUser });

      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirm the user is an Admin.
          if (idTokenResult.claims.domainId) {
            console.log('SignIn::Set domain::', idTokenResult.claims);
            dispatch({ type: 'SET_DOMAIN', payload: idTokenResult.claims.domainId });
            dispatch({ type: 'LOGIN_SUCCESS' });
          } else {
            console.log('SignIn::No domain::', idTokenResult.claims);
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
      dispatch({ type: 'RESET_FIRSTLOAD' });
    })
  }
}

export const setDomain = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)

      console.log('Firebase::CurrentUser::', firebase.auth().currentUser);
      dispatch({ type: 'SET_CURRENT_USER', payload: firebase.auth().currentUser });

      firebase.auth().currentUser.getIdTokenResult()
        .then(async (idTokenResult) => {
          // Confirm the user is an Admin.
          if (idTokenResult.claims.domainId) {
            console.log('setDomain::set domain::', idTokenResult.claims);
            
            await firebase.firestore()
            .collection('domains')
            .doc(idTokenResult.claims.domainId)
            .onSnapshot({}, function (doc) {
              const data = doc.data();

              if (data) {
                  dispatch({ type: 'SET_DOMAIN_NAME', payload: data.display_name });
              }
            });
    
            dispatch({ type: 'SET_DOMAIN', payload: idTokenResult.claims.domainId });
          } else {
            console.log('SetDomain::NO_DOMAIN',idTokenResult.claims);
            dispatch({ type: 'NO_DOMAIN' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'NO_DOMAIN' });
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
        
    }
  }
}

export const updateUserProfile = (updatedValues) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const currentUser = firebase.auth().currentUser;

    if (currentUser.email !== updatedValues.email) {
      firebase.auth().currentUser.updateEmail(updatedValues.email)
      .then(() =>  notifiy({ type: 'warning', message: 'Success', description: 'Email Updated :)' })
      )
      .catch(err => notifiy({ type: 'warning', message: 'Failure', description: err.message }));
    }

    if (currentUser.displayName !== updatedValues.displayName) {
      firebase.auth().currentUser.updateProfile({ displayName: updatedValues.displayName })
      .then(() =>  notifiy({ type: 'success', message: 'Success', description: 'Display Name Updated :)' }))
      .catch(err => notifiy({ type: 'warning', message: 'Failure', description: err.message }));
    }

  }
}

export const changePassword = (password, newPassword) => {
  return async (dispatch, getState, { getFirebase }) => {

    try {
      const firebase = getFirebase();

      const user = firebase.auth().currentUser;
      const email = user.email;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );    
      
      await user.reauthenticateAndRetrieveDataWithCredential(credential);
      // User re-authenticated.

      await user.updatePassword(newPassword);

      notifiy({ type: 'success', message: 'Success', description: 'Password Changed!' })
        
    } catch (error) {
      console.log('AuthError::PasswordError::', error);

      switch (error.code) {
        case "auth/wrong-password":
          notifiy({ type: 'warning', message: 'Password Failure', description: 'Current password was incorrect' });
          break;
        case "auth/argument-error":
          notifiy({ type: 'warning', message: 'Password Change Failure', description: 'Password was not strong enough' });
          break;
      
        default:
          notifiy({ type: 'warning', message: 'Password Failure', description: error.message });
          break;
      }
    }
  }
}

