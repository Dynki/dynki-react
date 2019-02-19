import reducer from './boardReducer';

describe('board reducer', () => {

    it('should return the initial state', () => {
        const testState = {
            boards: null,
            currentBoard: null,
            firstLoad: true
        }
        expect(reducer(undefined, {})).toEqual(testState);
    });

    it('should handle REFRESH_BOARDS', () => {
        const action = {
            type: 'REFRESH_BOARDS',
            payload: [{ id: 1 }]
        }
        expect(reducer({}, action)).toEqual({ boards: [{ id: 1 }] });
    });

    it('should handle SET_CURRENT_BOARD', () => {
        const action = {
            type: 'SET_CURRENT_BOARD',
            payload: { id: 1 }
        }
        expect(reducer({}, action)).toEqual({ currentBoard: { id: 1 }, firstLoad: false });
    });

});