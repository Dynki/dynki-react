import reducer from './authReducer';

describe('auth reducer', () => {

    it('should return the initial state', () => {
        const testState = {
            authError: null,
            pending: false
        }
        expect(reducer(undefined, {})).toEqual(testState);
    });

    it('should handle ATTEMPT_LOGIN', () => {
        const action = {
            type: 'ATTEMPT_LOGIN'
        }
        expect(reducer({}, action)).toEqual({ pending: true });
    });

    it('should handle ATTEMPT_SIGNUP', () => {
        const action = {
            type: 'ATTEMPT_SIGNUP'
        }
        expect(reducer({}, action)).toEqual({ pending: true });
    });

    it('should handle SIGNUP_ERROR', () => {
        const action = {
            type: 'SIGNUP_ERROR'
        }
        expect(reducer({}, action)).toEqual({ pending: false, authError: 'Sign Up Failed' });
    });

    it('should handle LOGIN_ERROR', () => {
        const action = {
            type: 'LOGIN_ERROR'
        }
        expect(reducer({}, action)).toEqual({ pending: false, authError: 'Login Failed' });
    });

    it('should handle VERIFICATION_ERROR', () => {
        const action = {
            type: 'VERIFICATION_ERROR'
        }
        expect(reducer({}, action)).toEqual({ pending: false, authError: 'Verification Failed' });
    });

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: 'LOGIN_SUCCESS'
        }
        expect(reducer({}, action)).toEqual({ pending: false, authError: null });
    });

    it('should handle SIGNUP_SUCCESS', () => {
        const action = {
            type: 'SIGNUP_SUCCESS'
        }
        expect(reducer({}, action)).toEqual({ pending: false, authError: null });
    });

    it('should handle SIGNOUT_SUCCESS', () => {
        const action = {
            type: 'SIGNOUT_SUCCESS'
        }
        expect(reducer({}, action)).toEqual({ });
    });

});