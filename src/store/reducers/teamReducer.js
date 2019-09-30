const initialState = {
    teams: [],
    currentTeam: {
        name: 'Team Dynki',
        enabled: true,
        groups: [
            { key: '1', name: 'Administrators' },
            { key: '2', name: 'Users' }
        ],
        members: [
            { 
                key: '1',
                name: 'DeanSelvey@gmail.com',
                tags: ['Administrators', 'Users'],
                status: 'Active' 
            },
            {
                key: '2',
                name: 'Jake@gmail.com',
                tags: ['Administrators'],
                status: 'Active'
            }
        ]
    }   
}

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default teamReducer;