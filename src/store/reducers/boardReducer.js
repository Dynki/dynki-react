import * as _ from 'lodash';

const initialState = {
    boards: [],
    boardLastUpdated: undefined,
    currentBoard: null,
    currentBoardRoles: null,
    firstLoad: true,
    noBoards: true,
    boardsChecked: false,
    selectedRows: [] 
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
                boardLastUpdated: new Date(),
                currentBoard: _.cloneDeep(action.payload),
                boardsChecked: true,
                noBoards: false,
                firstLoad: false,
                selectedRows: []
            }
        case 'SET_SELECTED_ROWS':
            return {
                ...state,
                selectedRows: action.payload
            }
        case 'SET_CURRENT_BOARD_ROLES':

            const updatedBoard = _.cloneDeep(state.currentBoard);
            updatedBoard.roles = action.payload;

            return {
                ...state,
                currentBoardRoles: _.cloneDeep(action.payload)
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