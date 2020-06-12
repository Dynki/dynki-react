import * as _ from 'lodash';

const initialState = {
    channels: [],
    current: null,
    currentMessages: null,
    emojiShowing: false,
    firstLoad: true,
    pageSize: 20
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
                currentMessages: []
            }
        case 'SET_CURRENT_CHANNEL_MESSAGES':
            return {
                ...state,
                currentMessages: action.payload,
            }
        case 'LOAD_MORE_MESSAGES':
            return {
                ...state,
                pageSize: state.pageSize + 20,
            }
        case 'TOGGLE_EMOJI':
            return {
                ...state,
                emojiShowing: !state.emojiShowing
            }
        default:
            return state;
    }
}

export default channelReducer;