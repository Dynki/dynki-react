import reducer from './baseReducer';

describe('base reducer', () => {

    it('should return the initial state', () => {
        const testState = {
            progress: false
        }
        expect(reducer(undefined, {})).toEqual(testState);
    });

    it('should handle SET_PROGRESS', () => {
        const action = {
            type: 'SET_PROGRESS',
            payload: 100
        }
        expect(reducer({}, action)).toEqual({ progress: 100 });
    });


});