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

            return {
                ...state,
                currentTeam: action.payload
            }
        case 'ADDED_TEAM_GROUP':
            const updatedGroups = [...state.currentTeam.groups, action.payload];

            return {
                ...state,
                currentTeam: {...state.currentTeam, groups: updatedGroups}
            }

        case 'REMOVED_TEAM_GROUP':
                const groups = state.currentTeam.groups.filter(g => g.id !== action.payload);
                const members = state.currentTeam.members.map(m => {
                    m.memberOf = m.memberOf.filter(grp => grp !== action.payload);
                    return m;
                });
    
                return {
                    ...state,
                    currentTeam: {...state.currentTeam, groups: groups, members: members}
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
                    currentTeam: {...state.currentTeam, groups: groupsUpdated }
                }
        case 'UPDATED_TEAM_MEMBER':
            const membersUpdated = state.currentTeam.members.map(m => {
                if (m.uid === action.payload.uid) {
                    m.memberOf = action.payload.memberOf;
                    m.status = action.payload.status;
                }
                return m;
            });

            return {
                ...state,
                currentTeam: {...state.currentTeam, members: membersUpdated }
            }

        case 'SET_TEAM_MEMBERS':
            return {
                ...state,
                currentTeam: {...state.currentTeam, members: action.payload }
            }
                
        default:
            return state;
    }
}

export default teamReducer;