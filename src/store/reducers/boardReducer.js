const initialState = {
    boards: null,
    currentBoard: null
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
            console.log('Set Current Board::', action.payload);
            return {
                ...state,
                currentBoard: action.payload
            }
        default:
            return state;
    }
}

export default boardReducer;