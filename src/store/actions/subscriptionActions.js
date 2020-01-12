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
  
      try {
        const subsHelper = new Subscriptions(getFirebase());
        await subsHelper.attachPaymentMethod(paymentMethodId);

        notifiy({ type: 'success', message: 'Payment method attached', description: 'Payment method was sucessfully attached' });
        
        return true;
      } catch (error) {
        notifiy({ type: 'warning', message: 'Failure to attach payment method', description: error.message });
      }
    }
  }
  
  