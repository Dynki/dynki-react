import notifiy from '../../components/notifications/Notification';

export const signIn = (credentials) => {
  return async (dispatch, getState, { getFirebase }) => {

    try {
      const firebase = getFirebase();
  
      dispatch({ type: 'ATTEMPT_LOGIN' })
  
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  
      dispatch({ type: 'SET_CURRENT_USER', payload: firebase.auth().currentUser });
  
      const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();


      // Confirm the user is an Admin.
      if (idTokenResult.claims.domainId) {
  
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
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'NO_DOMAIN' });
        dispatch({ type: 'LOGIN_SUCCESS' });
      }
  
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error });
      notifiy({ type: 'warning', message: 'Login Failure', description: error.message })
    }


  }
}

export const signUp = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: 'ATTEMPT_SIGNUP' })
  
    firebase.auth().createUserWithEmailAndPassword(
      credentials.userName,
      credentials.password
    ).then(() => {
  
      firebase.auth().currentUser.reload();
      dispatch({ type: 'SIGNUP_SUCCESS', payload: firebase.auth().currentUser });

    }).catch((err) => {
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

export const setDomain = (domainId) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: 'SET_PROGRESS', payload: true });

    try {
      await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)

      dispatch({ type: 'SET_CURRENT_USER', payload: firebase.auth().currentUser });

      const idTokenResult = await firebase.auth().currentUser.getIdTokenResult(true)
      const domainToSet = domainId ? domainId : idTokenResult.claims.domainId;

      // Confirm the user is an Admin.
      if (domainToSet) {

        console.log('Setting Domain', domainToSet);

        await firebase.firestore()
          .collection('domains')
          .doc(domainToSet)
          .onSnapshot({}, function (doc) {
            const data = doc.data();

            if (data) {
              dispatch({ type: 'SET_DOMAIN_NAME', payload: data.display_name });
            }
          }, (err) => console.log('Error with domain', err));

        dispatch({ type: 'SET_DOMAIN', payload: domainToSet });
      } else {
        dispatch({ type: 'NO_DOMAIN' });
      }
    } catch (error) {
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'NO_DOMAIN' });
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })

    } finally {
      dispatch({ type: 'SET_PROGRESS', payload: false });
    }
  }
}

export const updateUserProfile = (updatedValues) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const currentUser = firebase.auth().currentUser;

    if (currentUser.email !== updatedValues.email) {
      firebase.auth().currentUser.updateEmail(updatedValues.email)
        .then(() => notifiy({ type: 'warning', message: 'Success', description: 'Email Updated :)' })
        )
        .catch(err => notifiy({ type: 'warning', message: 'Failure', description: err.message }));
    }

    if (currentUser.displayName !== updatedValues.displayName) {
      firebase.auth().currentUser.updateProfile({ displayName: updatedValues.displayName })
        .then(() => notifiy({ type: 'success', message: 'Success', description: 'Display Name Updated :)' }))
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

export const forgotPassword = (email) => {
  return async (dispatch, getState, { getFirebase }) => {

    try {
      const firebase = getFirebase();

      await firebase.auth().sendPasswordResetEmail(email);

      notifiy({ type: 'success', message: 'Success', description: 'Reset email sent, please check your email!' })

    } catch (error) {
      notifiy({ type: 'warning', message: 'Password Failure', description: error.message });
    }
  }
}

export const deleteAccount = () => {
  return async (dispatch, getState, { getFirebase }) => {

    try {
      const firebase = getFirebase();

      const user = firebase.auth().currentUser;

      await user.delete();
      dispatch({ type: 'SIGNOUT_SUCCESS' });

    } catch (error) {
      notifiy({ type: 'warning', message: 'Delete Failure', description: error.message });
    }
  }
}

