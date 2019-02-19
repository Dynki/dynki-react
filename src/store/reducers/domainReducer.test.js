import reducer from './domainReducer';

describe('domain reducer', () => {

    it('should return the initial state', () => {
        const testState = {
            validateFeedback: undefined,
            validateStatus: undefined,
            domainValid: false,
            domainChecked: false,
            noDomain: false,
            domainId: null,
            pending: false
        }
        expect(reducer(undefined, {})).toEqual(testState);
    });

    it('should handle VALIDATING_DOMAIN', () => {
        const action = {
            type: 'VALIDATING_DOMAIN'
        }
        expect(reducer({}, action)).toEqual({ validateStatus: 'validating', domainValid: false });
    });

    it('should handle DOMAIN_TOO_SHORT', () => {
        const action = {
            type: 'DOMAIN_TOO_SHORT'
        }

        const expectedState = {
            validateStatus: 'error',
            validateFeedback: 'Too short, try a longer name!',
            domainValid: false
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle DOMAIN_TOO_LONG', () => {
        const action = {
            type: 'DOMAIN_TOO_LONG'
        }

        const expectedState = {
            validateStatus: 'error',
            validateFeedback: 'Too long, too long!',
            domainValid: false
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle DOMAIN_INVALID_CHARS', () => {
        const action = {
            type: 'DOMAIN_INVALID_CHARS'
        }

        const expectedState = {
            validateStatus: 'error',
            validateFeedback: 'Sorry no wacky characters allowed!',
            domainValid: false
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle DOMAIN_EXISTS', () => {
        const action = {
            type: 'DOMAIN_EXISTS'
        }

        const expectedState = {
            validateStatus: 'error',
            validateFeedback: 'Aww team name already exists',
            domainValid: false
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle DOMAIN_OK', () => {
        const action = {
            type: 'DOMAIN_OK'
        }

        const expectedState = {
            validateStatus: 'success',
            validateFeedback: 'Team name is good!!',
            domainValid: true
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle SET_DOMAIN', () => {
        const action = {
            type: 'SET_DOMAIN'
        }

        const expectedState = {
            noDomain: false,
            domainId: action.payload,
            domainValid: true,
            pending: false,
            domainChecked: true
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle NO_DOMAIN', () => {
        const action = {
            type: 'NO_DOMAIN'
        }

        const expectedState = {
            noDomain: true,
            domainId: null,
            domainValid: false,
            domainChecked: true
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should handle CREATE_DOMAIN', () => {
        const action = {
            type: 'CREATE_DOMAIN'
        }

        const expectedState = {
            pending: true
        }
        expect(reducer({}, action)).toEqual(expectedState);
    });
});