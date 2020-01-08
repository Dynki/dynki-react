import axios from 'axios';

export class Subscriptions {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/subscriptions`;
        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/subscriptions`;
        }
    }

    /**
     * Get the subscription information for this domain id.
     * 
     * Parameter: id {string} - The id (guid) of the domain for which we are getting subscription information.
     * 
     * Returns: A subscription class instance
     */
    get(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const snapshot = await this.firebase.firestore().collection('user-domains')
                .where('users', 'array-contains', this.firebase.auth().currentUser.uid)
                .get();
                resolve(snapshot.docs.filter(doc => doc.id === id).map(doc => ({ id: doc.id, ...doc.data() }))[0] );

            } catch (error) {
                console.log('Error getting subscription', error);
                reject(error);
            }
        });
    }

    /**
     * Adds a new subscription for this user.
     * 
     */
    async add(packageName) {
        const url = `${this.baseUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const newSubscription = await axios.post(url, { plan: packageName }, { headers: { uid, token, authorization: token } });

            return newSubscription;
        } catch (error) {
            console.log('Error adding subscription', error);
            return error;
        }
    }

    /**
     * Cancel this users subscription. Should only refer to when the user is on a paid subscription.
     * 
     * 
    */
    delete() {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
                const uid = this.firebase.auth().currentUser.uid;
                const newSubscription = await axios.delete(url, { headers: { uid, token, authorization: token } });

                resolve(newSubscription);

            } catch (error) {
                console.log('Error removing subscription', error);
                reject(error);
            }
        });
    }

    /**
     * Update a users subscription. Occurs when a user is upgrading to another plan.
     * 
    */
    update(packageName) {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
                const uid = this.firebase.auth().currentUser.uid;
                const newSubscription = await axios.put(url, { packageName }, { headers: { uid, token, authorization: token } });

                resolve(newSubscription);
            } catch (error) {
                console.log('Error updating subscription', error);
                reject(error);
            }
        });
    }
}
