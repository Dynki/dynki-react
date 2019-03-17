const initialState = {
    validateFeedback: undefined,
    validateStatus: undefined,
    domainValid: false,
    domainChecked: false,
    noDomain: false,
    domainId: null,
    pending: false,
    name: ''
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNOUT_SUCCESS':
            console.log('Signout Success')
            return {
                ...state,
                ...initialState
            };

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
            console.log('Set Domain::', action.payload);
            return {
                ...state,
                noDomain: false,
                domainId: action.payload,
                domainValid: true,
                pending: false,
                domainChecked: true
            }
        case 'SET_DOMAIN_NAME':
            console.log('Set Domain Name::', action.payload);
            return {
                ...state,
                name: action.payload
            }
        case 'NO_DOMAIN':
            console.log('No Domain')
            return {
                ...state,
                noDomain: true,
                pending: false,
                domainId: null,
                domainValid: false,
                domainChecked: true
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                noDomain: true,
                pending: false,
                domainId: null,
                domainValid: false,
                domainChecked: true
            }
        case 'CREATING_DOMAIN':
            console.log('Create Domain')
            return {
                ...state,
                pending: true
            }
        case 'DOMAIN_CREATION_ERROR':
            console.log('Error Creating Domain')
            return {
                ...state,
                pending: false
            }
        default:
            return state;
    }
}

export default domainReducer;