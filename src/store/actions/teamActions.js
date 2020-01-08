import axios from 'axios';
import * as _ from 'lodash';
import { Teams } from '../model/Teams';
import notifiy from '../../components/notifications/Notification';

// Create a new blank team with this user's domain.
export const newTeam = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            const newTeam = await teamsHelper.add();
            dispatch({ type: 'SET_CURRENT_TEAM', payload: newTeam });
            dispatch(getTeams());        
            dispatch(getTeam(newTeam.id));        
        } catch (error) {
            console.log(error, 'Add team error');
            notifiy({ type: 'error', message: 'Add team failure', description: error.message });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }

        return Promise.resolve(newTeam);
    }
}

// Get all teams within this user's domain.
export const getTeams = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            dispatch({ type: 'ATTEMPT_LOADING_TEAMS' });
            
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            const teams = await teamsHelper.list();
    
            if (!teams || teams.length < 1) {
                dispatch({ type: 'NO_TEAMS' });
            } else {
                dispatch(getTeam(getState().domain.domainId));
                dispatch({ type: 'REFRESH_TEAMS', payload: teams });
            }
            
        } catch (error) {
            console.log(error, 'Get teams error');
            notifiy({ type: 'error', message: 'Teams retrieval failure', description: error.message });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Get an individual team by id.
export const getTeam = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'ATTEMPT_LOADING_TEAM', payload: id });
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const currentTeam = getState().teams.currentTeam;
    
            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentTeam && currentTeam.unsubscribe) {
                currentTeam.unsubscribe();
            }
    
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            const team = await teamsHelper.get(id);
    
            dispatch({ type: 'SET_CURRENT_TEAM', payload: team });
        } catch (error) {
            console.log(error, 'Get team error');
            notifiy({ type: 'error', message: 'Team retrieval failure', description: error.message });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Add an individual team by id.
export const addTeamGroup = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            const newTeam = await teamsHelper.addGroup(id, 'New group');
    
            dispatch({ type: 'ADDED_TEAM_GROUP', payload: newTeam.data });
        } catch (error) {
            console.log(error, 'add team group error');
            notifiy({ type: 'error', message: 'Add group failure', description: error });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}


// Delete an individual team by id.
export const deleteTeamGroup = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            const deletedGroupResponse = await teamsHelper.removeGroup(getState().teams.currentTeam.id ,id);
    
            if (deletedGroupResponse.status === 200) {
                dispatch({ type: 'REMOVED_TEAM_GROUP', payload: id });
            }
        } catch (error) {
            console.log(error, 'delete team group error');
            notifiy({ type: 'error', message: 'Delete group failure', description: error });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Update an individual team by id.
export const updateTeamGroup = (id, updatedGroup) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
    
            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            await teamsHelper.updateGroup(getState().teams.currentTeam.id, id, updatedGroup);
            dispatch({ type: 'UPDATED_TEAM_GROUP', payload: { id, name: updatedGroup.name } });
        } catch (error) {
            console.log(error, 'update group error');
            notifiy({ type: 'error', message: 'Update group failure', description: error });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Update an individual team by id.
export const updateTeamMember = (id, updatedMember) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });

            const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);
            await teamsHelper.updateMember(getState().teams.currentTeam.id, id, updatedMember);

            dispatch({ type: 'UPDATED_TEAM_MEMBER', payload: updatedMember });
        } catch (error) {
            console.log(error, 'update member error');
            notifiy({ type: 'error', message: 'Update failure', description: error });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

// Update an individual team by id.
export const inviteTeamMember = (emails) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const teamsHelper = new Teams(getFirebase(), getState().domain.domainId);

        try {
            await teamsHelper.inviteMember(emails, getState().teams.currentTeam.id, getState().teams.currentTeam.display_name);
            dispatch({ type: 'INVITED_TEAM_MEMBER' });
            notifiy({ type: 'success', message: 'Invite Success', description: 'Successfully invited team member' });
        } catch (error) {
            console.log('Failed to invite user', error);
            notifiy({ type: 'error', message: 'Invite failure', description: error, duration: 0 });
            dispatch(getTeam(getState().domain.domainId));
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}

export const acceptInvite = (inviteId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'SET_PROGRESS', payload: true });

        let url;
        if (process.env.NODE_ENV !== 'production') {
            url = `https://us-central1-dynki-c5141.cloudfunctions.net/invite/${inviteId}/accept`;
        } else {
            url = `https://us-central1-dynki-prod.cloudfunctions.net/invite/${inviteId}/accept`;
        }
        const firebase = getFirebase();

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true });
            const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            const uid = firebase.auth().currentUser.uid;

            await axios.post(url, {}, { headers: { token, uid } })
            notifiy({ type: 'success', message: 'Way to go!', description: 'You are now part of this team, please log out and log back in to see you new team', duration: 0 });
            dispatch(getTeams());        
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Acceptance failure', description: error });
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }    
}

