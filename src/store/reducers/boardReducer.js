import * as _ from 'lodash';

const initialState = {
    boards: [],
    currentBoard: null,
    firstLoad: true,
    noBoards: true,
    boardsChecked: false
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_BOARDS':
            return {
                ...state,
                noBoards: false,
                boardsChecked: true,
                boards: action.payload
            }
        case 'SET_CURRENT_BOARD':
            return {
                ...state,
                currentBoard: _.cloneDeep(action.payload),
                boardsChecked: true,
                noBoards: false,
                firstLoad: false
            }
        case 'RESET_FIRSTLOAD':
            return {
                ...state,
                boardsChecked: false,
                firstLoad: true
            }
        case 'NO_BOARDS':
            return {
                ...state,
                noBoards: true,
                currentBoard: undefined,
                boardsChecked: true,
                boards: []
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}

export default boardReducer;