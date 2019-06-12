const initialState = {
    folderDrawerVisible: false
}

const coreReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_FOLDER_DRAWER':
            return {
                ...state,
                folderDrawerVisible: !state.folderDrawerVisible
            }
        default:
            return state;
    }
}

export default coreReducer;