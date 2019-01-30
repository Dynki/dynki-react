const initialState = {
    progress: false
}

const baseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROGRESS':
            return {
                ...state,
                progress: action.payload
            }
        default:
            return state;
    }
}

export default baseReducer;