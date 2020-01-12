import axios from 'axios';

const plans = {
    business: 'Business',
    personal: 'Personal'
}

const subscriptionStatus = {
    active: { name: 'Active', plan: plans.business, allowUpgrade: false, configurePayment: true },
    trialing: { name: 'Business Trial', plan: plans.business, allowUpgrade: true, configurePayment: true },
    past_due: { name: 'Payment Overdue', plan: plans.business, allowUpgrade: false, configurePayment: true },
    unpaid: { name: 'Payment Overdue', plan: plans.business, allowUpgrade: false, configurePayment: true },
    incomplete: { name: 'Expired', plan: plans.personal, allowUpgrade: true, configurePayment: false },
    incomplete_expired: { name: 'Expired', plan: plans.personal, allowUpgrade: true, configurePayment: false }
}

export class Subscriptions {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/subscriptions`;
            this.pmUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/paymentMethods`;
            
        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/subscriptions`;
            this.pmUrl = `https://us-central1-dynki-prod.cloudfunctions.net/paymentMethods`;
        }
    }

    /**
     * Get the subscription information for this domain id.
     * 
     * Parameter: id {string} - The id (guid) of the domain for which we are getting subscription information.
     * 
     * Returns: A subscription class instance
     */
    async get() {
        try {
            const url = `${this.baseUrl}/account`;
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.get(url, { headers: { uid, token, authorization: token } });

            return response.data;
        } catch (error) {
            console.log('Error getting subscription', error);
            return error;
        }
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

    async attachPaymentMethod(paymentMethodId) {
        const url = `${this.pmUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.post(url, { paymentMethodId }, { headers: { uid, token, authorization: token } });

            return response.statu;
        } catch (error) {
            console.log('Error updating subscription', error);
            return error;
        }
    }

    allowPaymentMethodSetup(status) {
        return subscriptionStatus[status] ? subscriptionStatus[status].configurePayment : false;
    }

    allowUpgrade(status) {
        return subscriptionStatus[status] ? subscriptionStatus[status].allowUpgrade : false;
    }

    allowDowngrade(status) {
        return subscriptionStatus[status] ? subscriptionStatus[status].allowUpgrade === false : false;
    }

    getPlanName = status => {
        return subscriptionStatus[status] ? subscriptionStatus[status].plan : 'Personal';
    }

    getPlanStatus = status => {
        return subscriptionStatus[status] ? subscriptionStatus[status].name : 'Uknown';
    }

    paymentRequired = status => {
        console.log('Payment required check', status);
        return status === 'past_due' || status === 'unpaid';
    }
}
