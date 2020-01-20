import notifiy from '../../components/notifications/Notification';
import { Subscriptions } from '../model/Subscriptions';

export const getSubscriptionDetails = () => {
    return async (dispatch, getState, { getFirebase }) => {

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });

            const subsHelper = new Subscriptions(getFirebase());
            const currentSubscription = await subsHelper.get();
            dispatch({ type: 'SET_SUBSCRIPTION_DATA', payload: currentSubscription });
            dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: currentSubscription.status });
        } catch (error) {
            notifiy({ type: 'warning', message: 'Failed to retrieve subscription details', description: error.message, duration: 0 });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const cancelSubscription = () => {
    return async (dispatch, getState, { getFirebase }) => {

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            const subsHelper = new Subscriptions(getFirebase());
            const response = await subsHelper.delete();

            console.log('Cancel Response', response);

            if (response.status === 200) {
                const currentSubscription = await subsHelper.get();
                dispatch({ type: 'SET_SUBSCRIPTION_DATA', payload: currentSubscription });
                dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: currentSubscription.status });
                notifiy({ type: 'success', message: 'Subscripton canceled', description: 'Your subscription has been downgraded to personal plan', duration: 0 });

            } else {
                notifiy({ type: 'warning', message: 'Failed to cancel your subscription', description: 'There was an error canceling your subscription', duration: 0 });
                console.log(response.error);
            }
        } catch (error) {
            notifiy({ type: 'warning', message: 'Failed to cancel your subscription', description: error.message, duration: 0 });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const reactivateAccount = () => {
    return async (dispatch, getState, { getFirebase }) => {

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            const subsHelper = new Subscriptions(getFirebase());
            const response = await subsHelper.reactivate();

            if (response.status === 200) {
                const currentSubscription = await subsHelper.get();
                dispatch({ type: 'SET_SUBSCRIPTION_DATA', payload: currentSubscription });
                dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: currentSubscription.status });
                notifiy({ type: 'success', message: 'Subscripton canceled', description: 'Your Business Plan subscription has reactivated', duration: 0 });

            } else {
                notifiy({ type: 'warning', message: 'Failed to cancel your subscription', description: 'There was an error reactivating your subscription', duration: 0 });
                console.log(response.error);
            }
        } catch (error) {
            notifiy({ type: 'warning', message: 'Failed to reactivate your subscription', description: error.message, duration: 0 });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const attachPaymentMethod = paymentMethodId => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: true });

        try {
            const subsHelper = new Subscriptions(getFirebase());
            await subsHelper.attachPaymentMethod(paymentMethodId);
            await dispatch(getSubscriptionDetails());
            return true;
        } catch (error) {
            return error;
        } finally {
            dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: false });
        }
    }
}

export const detachPaymentMethod = paymentMethodId => {
    return async (dispatch, getState, { getFirebase }) => {

        dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: true });

        try {
            const subsHelper = new Subscriptions(getFirebase());
            await subsHelper.detachPaymentMethod(paymentMethodId);
            await dispatch(getSubscriptionDetails());
            notifiy({ type: 'success', message: 'Payment method', description: 'Payment method successfully removed', duration: 0 });

            return true;
        } catch (error) {
            return error;
        } finally {
            dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: false });
        }
    }
}

export const setDefaultPaymentMethod = paymentMethodId => {
    return async (dispatch, getState, { getFirebase }) => {

        dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: true });

        try {
            const subsHelper = new Subscriptions(getFirebase());
            await subsHelper.setDefaultPaymentMethod(paymentMethodId);
            await dispatch(getSubscriptionDetails());
            notifiy({ type: 'success', message: 'Payment method', description: 'Default payment method successfully set', duration: 0 });

            return true;
        } catch (error) {
            return error;
        } finally {
            dispatch({ type: 'SET_SUBSCRIPTION_LOADING', payload: false });
        }
    }
}

export const createSetupIntent = paymentMethodId => {
    return async (dispatch, getState, { getFirebase }) => {

        try {
            const subsHelper = new Subscriptions(getFirebase());
            const response = await subsHelper.createSetupIntent(paymentMethodId);

            return response;
        } catch (error) {
            return error;
        }
    }
}
