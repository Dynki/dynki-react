import CountryCodes from '../model/countries.json';

const initialState = {
    folderDrawerVisible: false,
    countryCode: 'UNKNOWN',
    country: null,
    countryCodes: CountryCodes
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
        case 'SET_COUNTRY':
            return {
                ...state,
                country: action.payload,
            }
        default:
            return state;
    }
}

export default coreReducer;