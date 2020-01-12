const initialState = {
    status: null,
    data: null
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION_STATUS':
            console.log('SR Setting sub status', action.payload);
            return {
                ...state,
                status: action.payload
            }
        case 'SET_SUBSCRIPTION_DATA':
            console.log('SR Setting sub data', action.payload);
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default subscriptionReducer;