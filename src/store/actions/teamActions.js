import newGuid from '../utils/guid';
import * as _ from 'lodash';
import { Teams } from '../model/Teams';


// Create a new blank team with this user's domain.
export const newTeam = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const teamsHelper = new Teams(getFirebase(), getState().domain.domainId)
        const newTeam = await teamsHelper.add();
        dispatch({ type: 'SET_CURRENT_TEAM', payload: newTeam });
        dispatch({ type: 'SET_PROGRESS', payload: false });

        dispatch(getTeams());        
        dispatch(getTeam(newTeam.id));        

        return Promise.resolve(newTeam);
    }
}

// Get all teams within this user's domain.
export const getTeams = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'ATTEMPT_LOADING_TEAMS' })
        
        const teamsHelper = new Teams(getFirebase(), getState().domain.domainId)
        const teams = await teamsHelper.list();

        if (!teams || teams.length < 1) {
            dispatch({ type: 'NO_TEAMS' });
        } else {
            dispatch({ type: 'REFRESH_TEAMS', payload: teams });
        }
        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}


// Get an individual team by id.
export const getTeam = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'ATTEMPT_LOADING_TEAM', payload: id })

        const currentTeam = getState().teams.currenTeam;

        // This is required to stop firestore creating multiple subscriptions, which then spam the system.
        if (currentTeam && currentTeam.unsubscribe) {
            currentTeam.unsubscribe();
        }

        const teamsHelper = new Teams(getFirebase(), getState().domain.domainId)
        const team = await teamsHelper.get(id);

        dispatch({ type: 'SET_CURRENT_TEAM', payload: team.data });
        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}
