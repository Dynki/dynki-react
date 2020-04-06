import * as _ from 'lodash';

const initialState = {
    channels: [],
    current: null,
    firstLoad: true,
}

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_CHANNELS':
            return {
                ...state,
                channels: action.payload
            }
        case 'SET_CURRENT_CHANNEL':
            return {
                ...state,
                current: _.cloneDeep(action.payload),
            }
        default:
            return state;
    }
}

export default channelReducer;