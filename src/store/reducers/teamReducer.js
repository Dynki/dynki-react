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
        case 'ADDED_TEAM_GROUP':
            const updatedGroups = [...state.currentTeam.groups, action.payload];

            console.log(action.payload, 'payload');
            console.log(updatedGroups, 'updatedGRoups');

            return {
                ...state,
                currentTeam: {...state.currentTeam, groups: updatedGroups}
            }

        case 'REMOVED_TEAM_GROUP':
                const groups = state.currentTeam.groups.filter(g => g.id !== action.payload);
    
                console.log(action.payload, 'payload');
                console.log(groups, 'updatedGRoups');
    
                return {
                    ...state,
                    currentTeam: {...state.currentTeam, groups: groups}
                }

        case 'UPDATED_TEAM_GROUP':
                const groupsUpdated = state.currentTeam.groups.map(g => {
                    if (g.id === action.payload.id) {
                        g.name = action.payload.name
                    }
                    return g;
                });
    
                return {
                    ...state,
                    currentTeam: {...state.currentTeam, groups: groupsUpdated}
                }
        
        default:
            return state;
    }
}

export default teamReducer;