import reducer from './rootReducers';

describe('root reducer', () => {

    it('should return the initial state', () => {
        const authState = {
            authError: null,
            pending: false
        }

        const baseState = {
            progress: false
        }

        const boardState = {
            boards: null,
            currentBoard: null,
            firstLoad: true
        }
        
        const domainState = {
            validateFeedback: undefined,
            validateStatus: undefined,
            domainValid: false,
            domainChecked: false,
            noDomain: false,
            domainId: null,
            pending: false
        }
        
        const testState = {
            auth: authState,
            base: baseState,
            boards: boardState,
            domain: domainState
        }
       
        expect(reducer(undefined, {}).auth).toEqual(testState.auth);
        expect(reducer(undefined, {}).base).toEqual(testState.base);
        expect(reducer(undefined, {}).boards).toEqual(testState.boards);
        expect(reducer(undefined, {}).domain).toEqual(testState.domain);
    });

});