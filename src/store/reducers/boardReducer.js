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
        default:
            return state;
    }
}

export default boardReducer;