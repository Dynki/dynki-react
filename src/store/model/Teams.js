import moment from 'moment';
import newGuid from '../utils/guid';

export class Teams {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;
    }

    /**
     * Get a individual team.
     * 
     * Parameter: id {string} - The id (guid) of the team to get.
     * 
     * Returns: A team class instance
     */
    get(id) {
        return new Promise((resolve, reject) => {

            const sub = this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('teams')
                .doc(id)
                .onSnapshot({}, function (doc) {
                    const team = doc.data();
    
                    // Add the subscription to the current board so we can kill it later.
                    if (team) {
                        team.unsubscribe = sub;
                        resolve(team);
                    }
                });
        });
    }

    /**
     * Get all teams for this domain.
     * 
     * Returns: A firebase snapshot instance containing the teams
     */
    list() {
        return new Promise((resolve, reject) => {
            this.firebase.firestore()
            .collection('domains')
            .doc(this.domainId)
            .collection('teams')
            .get()
            .then(function (querySnapshot) {
                const teams = [];

                querySnapshot.forEach(function(doc) {
                    const team = {id: doc.id, ...doc.data()};
                    teams.push(team);
                });

                resolve(teams);
            });
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
