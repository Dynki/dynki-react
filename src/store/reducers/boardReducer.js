const initialState = {
    boards: null,
    currentBoard: null,
    firstLoad: true
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_BOARDS':
            console.log('Refresh boards')
            return {
                ...state,
                boards: action.payload
            }
        case 'SET_CURRENT_BOARD':
            return {
                ...state,
                currentBoard: action.payload,
                firstLoad: false
            }
        case 'RESET_FIRSTLOAD':
            return {
                ...state,
                firstLoad: true
            }
        default:
            return state;
    }
}

export default boardReducer;