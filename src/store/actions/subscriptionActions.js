import notifiy from '../../components/notifications/Notification';
import { Subscriptions } from '../model/Subscriptions';

export const getSubscriptionDetails = () => {
  return async (dispatch, getState, { getFirebase }) => {

    try {
      const subsHelper = new Subscriptions(getFirebase());
      const currentSubscription = await subsHelper.get();
      dispatch({ type: 'SET_SUBSCRIPTION_DATA', payload: currentSubscription });
    } catch (error) {
      notifiy({ type: 'warning', message: 'Failed to retrieve subscription details', description: error.message });
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
            notifiy({ type: 'success', message: 'Payment method', description: 'Payment method successfully attached' });

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
            notifiy({ type: 'success', message: 'Payment method', description: 'Payment method successfully detached' });

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
            notifiy({ type: 'success', message: 'Payment method', description: 'Default payment method successfully set' });

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
  