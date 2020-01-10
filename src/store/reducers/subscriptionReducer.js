const initialState = {
    status: null,
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION_STATUS':
            console.log('SR Setting sub status', action.payload);
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}

export default subscriptionReducer;