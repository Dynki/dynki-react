const initialState = {
    teams: [],
    currentTeam: null
}

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_TEAMS':
            return {
                ...state,
                teams: action.payload
            }
        case 'SET_CURRENT_TEAM':
            console.log('Setting current team', action.payload);

            return {
                ...state,
                currentTeam: action.payload
            }
    
        default:
            return state;
    }
}

export default teamReducer;