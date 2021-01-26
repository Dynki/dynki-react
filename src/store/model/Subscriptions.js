import axios from 'axios';

const plans = {
    business: 'Business',
    personal: 'Personal'
}

const subscriptionStatus = {
    active: {
        name: 'Active',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: true,
        configurePayment: true,
        paymentIntent: false,
        hasCost: true
    },
    trialing: {
        name: 'Business Trial',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: false,
        configurePayment: true,
        paymentIntent: false,
        hasCost: true
    },
    past_due: {
        name: 'Payment Overdue',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: false,
        configurePayment: true,
        paymentIntent: true,
        hasCost: true
    },
    unpaid: {
        name: 'Payment Overdue',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: false,
        configurePayment: true,
        paymentIntent: true,
        hasCost: true
    },
    incomplete: {
        name: 'Payment Overdue',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: false,
        configurePayment: true,
        paymentIntent: true,
        hasCost: true
    },
    incomplete_expired: {
        name: 'Payment Overdue',
        plan: plans.business,
        allowUpgrade: false,
        allowDowngrade: true,
        allowReactivate: false,
        configurePayment: true,
        paymentIntent: true,
        hasCost: true
    },
    canceled: {
        name: 'Expired',
        plan: plans.personal,
        allowUpgrade: true,
        allowDowngrade: false,
        allowReactivate: false,
        configurePayment: false,
        paymentIntent: true,
        hasCost: false
    }
}

export class Subscriptions {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/subscriptions`;
            this.pmUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/paymentMethods`;
            this.siUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/setupIntents`;

        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/subscriptions`;
            this.pmUrl = `https://us-central1-dynki-prod.cloudfunctions.net/paymentMethods`;
            this.siUrl = `https://us-central1-dynki-prod.cloudfunctions.net/setupIntents`;
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
    async add(packageName, countryCode, region, VATNumber) {
        const url = `${this.baseUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const newSubscription = await axios.post(url, { plan: packageName, countryCode, region, VATNumber }, { headers: { uid, token, authorization: token } });

            return newSubscription.data;
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
    async delete() {
        const url = `${this.baseUrl}/account`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.delete(url, { headers: { uid, token, authorization: token } });
            return response;
        } catch (error) {
            console.log('Error removing subscription', error);
            return error;
        }
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


    /**
     * Reactivate a users subscription. Can occur when a subscription is cancelled but at the end of the current period.
     * 
    */
    async reactivate() {
        const url = `${this.baseUrl}/account`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.put(url, { action: 'reactivate' }, { headers: { uid, token, authorization: token } });

            return response;
        } catch (error) {
            console.log('Error reactivating subscription', error);
            return error;
        }
    }

    async createSetupIntent(paymentMethodId) {
        const url = `${this.siUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.post(url, { paymentMethodId }, { headers: { uid, token, authorization: token } });

            return response.data;
        } catch (error) {
            console.log('Error creating setup intent', error);
            return error;
        }
    }

    async attachPaymentMethod(paymentMethodId) {
        const url = `${this.pmUrl}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.post(url, { paymentMethodId }, { headers: { uid, token, authorization: token } });

            return response.status;
        } catch (error) {
            console.log('Error attaching payment method', error);
            return error;
        }
    }

    async detachPaymentMethod(paymentMethodId) {
        const url = `${this.pmUrl}/${paymentMethodId}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.put(url, { action: 'detach' }, { headers: { uid, token, authorization: token } });

            return response.status;
        } catch (error) {
            console.log('Error detaching payment method', error);
            return error;
        }
    }

    async setDefaultPaymentMethod(paymentMethodId) {
        const url = `${this.pmUrl}/${paymentMethodId}`;

        try {
            const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = this.firebase.auth().currentUser.uid;
            const response = await axios.put(url, { action: 'set_default' }, { headers: { uid, token, authorization: token } });

            return response.status;
        } catch (error) {
            console.log('Error detaching payment method', error);
            return error;
        }
    }

    allowPaymentMethodSetup(status) {
        return subscriptionStatus[status] ? subscriptionStatus[status].configurePayment : false;
    }

    allowUpgrade(status) {
        return subscriptionStatus[status] ? subscriptionStatus[status].allowUpgrade : false;
    }

    allowDowngrade(status, subscription) {
        const cancelInProgress = subscription.cancel_at_period_end === true || subscription.cancel_at !== null;
        return subscriptionStatus[status].allowDowngrade && !cancelInProgress;
    }

    allowReactivate(status, subscription) {
        const cancelInProgress = subscription.cancel_at_period_end === true || subscription.cancel_at !== null;
        return subscriptionStatus[status].allowReactivate && cancelInProgress;
    }

    getPlanName = status => {
        return subscriptionStatus[status] ? subscriptionStatus[status].plan : 'Personal';
    }

    getPlanStatus = status => {
        return subscriptionStatus[status] ? subscriptionStatus[status].name : 'Uknown';
    }

    paymentRequired = status => {
        return status === 'past_due' || status === 'unpaid';
    }

    getTrialEndDate = (status, unixDate) => {
        if (status === 'trialing') {
            return unixDate !== null && unixDate !== undefined ? new Date(unixDate * 1000).toDateString() : '';
        } else {
            return '';
        }
    }

    getCancelAtDate = (status, unixDate) => {
        if (status === 'active') {
            return unixDate !== null && unixDate !== undefined ? new Date(unixDate * 1000).toDateString() : '';
        } else {
            return '';
        }
    }

    createPaymentIntent = status => {
        return subscriptionStatus[status] ? subscriptionStatus[status].paymentIntent : false;
    }

    getPlanCost = subscription => {
        const cost = subscription.cost / 100;
        const quantity = subscription.quantity
        const currency = subscription.currency === 'gbp' ? '£' : '$';
        const tax = subscription.cost_tax && subscription.cost_tax !== 0 ? subscription.cost_tax / 100 : 0;
        const total = cost;
        const incVat = tax > 0 ? '(excl VAT)' : ''
        const users = quantity === 1 ? 'user' : 'users';


        return subscriptionStatus[subscription.status]?.hasCost ?
            `${currency}${total} Per Month ${incVat} - (${quantity} ${users})` : 'Free';
    }
}
