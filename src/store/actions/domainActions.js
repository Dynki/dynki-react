import axios from 'axios';

export const checkDomain = (name) => {

   const domainValidForSubmission = (value, dispatch) => {

        if (value === undefined || value === null || value.length === 0){
            return false;
        }

        if (value.length > 0 && value.length < 4) {
            dispatch({ type: 'DOMAIN_TOO_SHORT' })
            return false;
        }
        
        if (value.length > 50) {
            dispatch({ type: 'DOMAIN_TOO_LONG' })
            return false;
        }

        const re = RegExp('^[0-9a-zA-Z \b]+$');
        if (value.length > 0 && !re.test(value)) {
            dispatch({ type: 'DOMAIN_INVALID_CHARS' })
            return false;

        }

        return true;
    }

    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        if (!domainValidForSubmission(name, dispatch)) {
            return;
        }

        dispatch({ type: 'VALIDATING_DOMAIN' })

        const url = `https://us-central1-dynki-c5141.cloudfunctions.net/checkdomain/${name}`;
        const firebase = getFirebase();

        try {
            const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            const uid = firebase.auth().currentUser.uid;
            
            await axios.get(url, { headers: { token , uid }})
            dispatch({ type: 'DOMAIN_OK' })

        } catch (error) {
            dispatch({ type: 'DOMAIN_EXISTS' })
        }
    }
}

export const createDomain = (name) => {

     return async (dispatch, getState, { getFirebase, getFirestore }) => {
 
         dispatch({ type: 'CREATING_DOMAIN' })
 
         const url = `https://us-central1-dynki-c5141.cloudfunctions.net/domains`;
         const firebase = getFirebase();
 
         try {
             const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
             const uid = firebase.auth().currentUser.uid;
             
             await axios.post(url, 
                {
                    uid,
                    name: name,
                    email: firebase.auth().currentUser.email,
                    displayName: firebase.auth().currentUser.displayName
                },
                { headers: { token , uid }})

            firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                // Confirm the user is an Admin.
                if (idTokenResult.claims.domainId) {
                    dispatch({ type: 'SET_DOMAIN', payload: idTokenResult.claims.domainId });
                } else {
                    console.log('CreateDomain::NO_DOMAIN');
                    dispatch({ type: 'NO_DOMAIN' });
                }
            })
            .catch((error) => {
                console.log(error);
            });
 
         } catch (error) {
             dispatch({ type: 'DOMAIN_CREATION_ERROR' })
         }
     }
 }