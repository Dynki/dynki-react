const initialState = {
    progress: false,
    inviteData: {
        inviteId: undefined,
        inviteName: undefined
    },
}

const baseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROGRESS':
            return {
                ...state,
                progress: action.payload
            }
        case 'SET_INVITE':
            return {
                ...state,
                inviteData: action.payload
            }
        default:
            return state;
    }
}

export default baseReducer;