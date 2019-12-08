import axios from 'axios';
import moment from 'moment';
import newGuid from '../utils/guid';

export class Teams {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;

        if (process.env.NODE_ENV !== 'production') {
            this.baseUrl = `https://us-central1-dynki-c5141.cloudfunctions.net/domains`;
            this.inviteUrl = 'https://us-central1-dynki-c5141.cloudfunctions.net/invite';
        } else {
            this.baseUrl = `https://us-central1-dynki-prod.cloudfunctions.net/domains`;
            this.inviteUrl = 'https://us-central1-dynki-prod.cloudfunctions.net/invite';
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
            try {
                const snapshot = await this.firebase.firestore().collection('user-domains')
                .where('users', 'array-contains', this.firebase.auth().currentUser.uid)
                .get();
                resolve(snapshot.docs.filter(doc => doc.id === id).map(doc => ({ id: doc.id, ...doc.data() }))[0] );

            } catch (error) {
                console.log('Error getting team', error);
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
            try {
                const snapshot = await this.firebase.firestore().collection('user-domains')
                .where('users', 'array-contains', this.firebase.auth().currentUser.uid)
                .get();
                resolve(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
            } catch (error) {
                console.log('Error getting teams', error);
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
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
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
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
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
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
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
                reject(error.response);
            }
        });
    }

    /**
     * Invite a team member.
     * 
     */
    async inviteMember(emails, domainId, domainName) {
        return new Promise(async (resolve, reject) => {
            const url = this.inviteUrl;

            try {
                const token = await this.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
                const uid = this.firebase.auth().currentUser.uid;

                const payload = { 
                    invitees: emails,
                    inviter: this.firebase.auth().currentUser.email,
                    domain: domainId,
                    domainName: domainName,
                }

                const inviteMemberRes = await axios.post(url, payload, { headers: { uid, token, authorization: token } });

                if (inviteMemberRes.status !== 200) {
                    reject(inviteMemberRes.statusText);
                } else {
                    resolve(inviteMemberRes.data);
                }
            } catch (error) {
                reject(error.response);
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
