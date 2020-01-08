import axios from 'axios';

export class Domains {

    constructor(firebase, domainId) {
        this.firebase = firebase;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/domains`;
        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/domains`;
        }
    }

    /**
     * Adds a new domain.
     * 
     */
    async add(name) {
        const url = `${this.baseUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const { uid, email } = this.firebase.auth().currentUser;

            const response = await axios.post(url, { displayName: name, name, email }, { headers: { uid, token, authorization: token } });

            return response.data;
        } catch (error) {
            const response = error.response
            return response.data.error;
        }
    }

    /**
     * Updates an existing domain.
     * 
     * Parameters: id - Id of the domain to update.
     *             name - Display name to update on the domain (currently can only update display name of domain).
     */
    async update(id, name) {
        const url = `${this.baseUrl}/${id}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const { uid } = this.firebase.auth().currentUser;

            await axios.put(url, { name }, { headers: { uid, token, authorization: token } });

            return;
        } catch (error) {
            const response = error.response
            return response.data.error;
        }
    }
}
