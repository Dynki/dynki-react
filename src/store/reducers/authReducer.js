const initialState = {
    authError: null,
    pending: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ATTEMPT_LOGIN':
            console.log('Atempt Login')
            return {
                ...state,
                pending: true
            }
        case 'ATTEMPT_SIGNUP':
            console.log('Atempt Sign Up')
            return {
                ...state,
                pending: true
            }
        case 'SIGNUP_ERROR':
            console.log('Sign Up Error')
            return {
                ...state,
                authError: 'Sign Up Failed',
                pending: false
            }
        case 'LOGIN_ERROR':
            console.log('Login Error')
            return {
                ...state,
                authError: 'Login Failed',
                pending: false
            }
        case 'VERIFICATION_ERROR':
            console.log('Verification Error')
            return {
                ...state,
                authError: 'Verification Failed',
                pending: false
            }
        case 'LOGIN_SUCCESS':
            console.log('Login Success')
            return {
                ...state,
                authError: null,
                pending: false
            }
        case 'SIGNUP_SUCCESS':
            console.log('Sign Up Success')
            return {
                ...state,
                authError: null,
                pending: false
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout Success')
            return state;
        default:
            return state;
    }
}

export default authReducer;