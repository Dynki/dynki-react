const initialState = {
    status: null,
    data: null,
    loading: false
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'SET_SUBSCRIPTION_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_SUBSCRIPTION_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default subscriptionReducer;