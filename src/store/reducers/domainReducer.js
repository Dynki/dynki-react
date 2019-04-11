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
            return {
                ...state,
                ...initialState
            };

        case 'VALIDATING_DOMAIN':
            return {
                ...state,
                validateStatus: 'validating',
                domainValid: false
            }
        case 'DOMAIN_TOO_SHORT':
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Too short, try a longer name!',
                domainValid: false
            }
        case 'DOMAIN_TOO_LONG':
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Too long, too long!',
                domainValid: false
            }
        case 'DOMAIN_INVALID_CHARS':
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Sorry no wacky characters allowed!',
                domainValid: false
            }
        case 'DOMAIN_EXISTS':
            return {
                ...state,
                validateStatus: 'error',
                validateFeedback: 'Aww team name already exists',
                domainValid: false
            }
        case 'DOMAIN_OK':
            return {
                ...state,
                validateStatus: 'success',
                validateFeedback: 'Team name is good!!',
                domainValid: true
            }
        case 'SET_DOMAIN':
            return {
                ...state,
                noDomain: false,
                domainId: action.payload,
                domainValid: true,
                pending: false,
                domainChecked: true
            }
        case 'SET_DOMAIN_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'NO_DOMAIN':
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
            return {
                ...state,
                pending: true
            }
        case 'DOMAIN_CREATION_ERROR':
            return {
                ...state,
                pending: false
            }
        default:
            return state;
    }
}

export default domainReducer;