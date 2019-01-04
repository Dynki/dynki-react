const initialState = {
    validateFeedback: undefined,
    validateStatus: undefined,
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VALIDATE_DOMAIN':
            console.log('Validate Domain')
            return {
                ...state,
                validateStatus: 'pending'
            }
        case 'DOMAIN_EXISTS':
            console.log('Domain Exists')
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Aww team name already exists'
            }
        case 'DOMAIN_OK':
            console.log('Domain ok')
            return {
                ...state,
                validateStatus: 'success',
                validateFeedback: 'Team name is good!!'
            }
        default:
            return state;
    }
}

export default domainReducer;