const initialState = {
    folderDrawerVisible: false,
    countryCode: 'UNKNOWN'
}

const coreReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_FOLDER_DRAWER':
            return {
                ...state,
                folderDrawerVisible: !state.folderDrawerVisible
            }
        case 'SET_COUNTRY_CODE':
            return {
                ...state,
                countryCode: action.payload,
            }
        default:
            return state;
    }
}

export default coreReducer;