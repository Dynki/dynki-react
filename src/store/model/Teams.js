import axios from 'axios';
import moment from 'moment';
import newGuid from '../utils/guid';

export class Teams {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/domains`;
        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/domains`;
        }
    }

    /**
     * Get a individual team.
     * 
     * Parameter: id {string} - The id (guid) of the team to get.
     * 
     * Returns: A team class instance
     */
    get(id) {
        return new Promise(async (resolve, reject) => {

            const url = `${this.baseUrl}/${id}`;

            try {
                console.log('Getting Team', id);

                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                const uid = this.firebase.auth().currentUser.uid;

                const domain = await axios.get(url, { headers: { uid, token, authorization: token } });

                resolve(domain);
    
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get all teams for this domain.
     * 
     * Returns: A firebase snapshot instance containing the teams
     */
    list() {
        return new Promise(async (resolve, reject) => {
            let url = this.baseUrl;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                const uid = this.firebase.auth().currentUser.uid;
    
                const domains = await axios.get(url, { headers: { uid, token, authorization: token } });

                resolve(domains.data);
    
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Adds a new team group.
     * 
     */
    async addGroup(teamId, name) {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}/${teamId}/groups`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                const uid = this.firebase.auth().currentUser.uid;

                const newGroup = await axios.post(url, { group_name: name }, { headers: { uid, token, authorization: token } });

                resolve(newGroup);

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Removes a team group.
     * 
     */
    async removeGroup(teamId, groupId) {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}/${teamId}/groups/${groupId}`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                const uid = this.firebase.auth().currentUser.uid;

                const removedGroupRes = await axios.delete(url, { headers: { uid, token, authorization: token } });

                resolve(removedGroupRes);

            } catch (error) {
                reject(error);
            }
        });
    }


    /**
     * Update a team group.
     * 
     */
    async updateGroup(teamId, groupId, updatedGroup) {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}/${teamId}/groups/${groupId}`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                const uid = this.firebase.auth().currentUser.uid;

                const removedGroupRes = await axios.put(url, { group_name: updatedGroup.name }, { headers: { uid, token, authorization: token } });

                resolve(removedGroupRes);

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Update a team member.
     * 
     */
    async updateMember(teamId, memberId, updatedMember) {
        return new Promise(async (resolve, reject) => {
            const url = `${this.baseUrl}/${teamId}/members/${memberId}`;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
                const uid = this.firebase.auth().currentUser.uid;

                const removedMemberRes = await axios.put(url, { ...updatedMember }, { headers: { uid, token, authorization: token } });

                resolve(removedMemberRes);

            } catch (error) {
                reject(error);
            }
        });
    }



    /**
     * Adds a new team.
     * 
     */
    async add() {
        const newTeam = {
            id: newGuid(),
            createdBy: this.firebase.auth().currentUser.uid,
            createdDate: moment().toDate(),
            name: ''
        }

        // Firebase requires the data to be parsed this way!!.
        const data = JSON.parse(JSON.stringify(newTeam));

        // Create the new team document, and then get it, to get it's ID.
        await this.firebase.firestore().collection('domains').doc(this.domainId).collection('teams').doc(newTeam.id).set(data);
        const newDoc = await this.firebase.firestore().collection('domains').doc(this.domainId).collection('boards').doc(newTeam.id).get();

        return Promise.resolve({ id: newDoc.id, ...newDoc.data() });
    }

    /**
     * Delete a individual team.
     * 
     * Parameter: id {string} - The id (guid) of the team to delete.
     * 
    */
    delete(id) {
        return new Promise(async (resolve, reject) => {

            // Delete the team document
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boards')
                .doc(id).delete();
    
            resolve();
        });
    }

    /**
     * Update a individual team.
     * 
    */
   update(team) {
        return new Promise(async (resolve, reject) => {
            delete team['unsubscribe'];
    
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boards')
                .doc(team.id)
                .set(team);

            resolve();
        });
    }
}