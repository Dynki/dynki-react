const initialState = {
    status: null,
    planName: null
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DOMAIN':
            return {
                ...state,
                status: action.payload.status,
                planName: action.payload.nickname
            }
        default:
            return state;
    }
}

export default domainReducer;