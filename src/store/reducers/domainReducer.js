const initialState = {
    validateFeedback: undefined,
    validateStatus: undefined,
    domainValid: false,
    noDomain: false,
    domainId: null,
    pending: false
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VALIDATING_DOMAIN':
            console.log('Validate Domain')
            return {
                ...state,
                validateStatus: 'validating',
                domainValid: false
            }
        case 'DOMAIN_TOO_SHORT':
            console.log('Domain Too Short')
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Too short, try a longer name!',
                domainValid: false
            }
        case 'DOMAIN_TOO_LONG':
            console.log('Domain Too Long')
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Too long, too long!',
                domainValid: false
            }
        case 'DOMAIN_INVALID_CHARS':
            console.log('Domain Wacky Chars')
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Sorry no wacky characters allowed!',
                domainValid: false
            }
        case 'DOMAIN_EXISTS':
            console.log('Domain Exists')
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Aww team name already exists',
                domainValid: false
            }
        case 'DOMAIN_OK':
            console.log('Domain ok')
            return {
                ...state,
                validateStatus: 'success',
                validateFeedback: 'Team name is good!!',
                domainValid: true
            }
        case 'SET_DOMAIN':
            console.log('Set Domain')
            return {
                ...state,
                noDomain: false,
                domainId: action.payload,
                domainValid: true,
                pending: false
            }
        case 'NO_DOMAIN':
            console.log('No Domain')
            return {
                ...state,
                noDomain: true,
                domainId: null,
                domainValid: false
            }
        case 'CREATE_DOMAIN':
            console.log('Create Domain')
            return {
                ...state,
                pending: true
            }
        default:
            return state;
    }
}

export default domainReducer;