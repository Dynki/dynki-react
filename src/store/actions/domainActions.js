import axios from 'axios';

export const checkDomain = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'VALIDATING_DOMAIN' })

        const url = 'https://us-central1-dynki-c5141.cloudfunctions.net/domains';
        const firebase = getFirebase();

        try {
            const token = await firebase.auth().currentUser.getIdTokenResult()
            const uid = firebase.auth().currentUser.uid;
            
            await axios.get(url, { headers: { token , uid }})
            dispatch({ type: 'DOMAIN_OK' })

        } catch (error) {
            dispatch({ type: 'DOMAIN_EXISTS' })
        }
    }
}