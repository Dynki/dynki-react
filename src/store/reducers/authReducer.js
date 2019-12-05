const initialState = {
    authError: null,
    pending: false,
    currentUser: {
        email: '',
        displayName: '',
        roles: [],
        hasRole: (roles, role) => roles.indexOf(role) !== -1
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ATTEMPT_LOGIN':
            return {
                ...state,
                pending: true
            }
        case 'ATTEMPT_SIGNUP':
            return {
                ...state,
                pending: true
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: 'Sign Up Failed',
                pending: false
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login Failed',
                pending: false
            }
        case 'VERIFICATION_ERROR':
            return {
                ...state,
                authError: 'Verification Failed',
                pending: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                pending: false
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null,
                currentUser: { ...initialState.currentUser, ...action.payload },
                pending: false
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                ...initialState
            }
        case 'SET_CURRENT_USER':
            console.log('Setting current user', action.payload);
            return {
                ...state,
                currentUser: { ...initialState.currentUser, ...action.payload }
            }

        default:
            return state;
    }
}

export default authReducer;