import moment from 'moment';
import newGuid from '../utils/guid';
import * as _ from 'lodash';

export class Boards {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;
    }

    /**
     * Get a individual board.
     * 
     * Parameter: id {string} - The id (guid) of the board to get.
     * 
     * Returns: A board class instance
     */
    get(id, ?currentBoard) {
        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        // This is required to stop firestore creating multiple subscriptions, which then spam the system.
        if (currentBoard && currentBoard.unsubscribe) {
            currentBoard.unsubscribe();
        }

        const sub = firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(id)
            .onSnapshot({}, function (doc) {
                const board = doc.data();

                // Add the subscription to the current board so we can kill it later.
                if (board) {
                    board.unsubscribe = sub;

                    board.groups = board.groups ? board.groups : { undefined: { name: 'Group 1', color: '2B82C1'} };

                    dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
                }
            });

    }

    }

    /**
     * Get all boards for this domain.
     * 
     * Returns: A firebase snapshot instance containing the boards
     */
    list() {
        return new Promise((resolve, reject) => {
            this.firebase.firestore()
            .collection('domains')
            .doc(this.domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .onSnapshot({}, function (doc) {
                const data = doc.data();

                if (data) {
                    const boards = data.boards;

                    if (!data.boards || data.boards.length < 1) {
                        resolve([]);
                    } else {
                        resolve(boards);
                    }
                } else {
                    resolve([])
                }
            });
        });
    }

    /**
     * Adds a new board.
     * 
     */
    async add() {
        const newBoard = {
            id: newGuid(),
            createdBy: this.firebase.auth().currentUser.uid,
            createdDate: moment().toDate(),
            description: '',
            title: 'Scratch',
            isFolder: false,
            entities: [{ id: 0, description: '' }],
            columns: [{ title: 'Description', model: 'description', class: 'text' }],
            type: 'Scratch'
        }

        // Firebase requires the data to be parsed this way!!.
        const data = JSON.parse(JSON.stringify(newBoard));

        // Create the new board document, and then get it, to get it's ID.
        await this.firebase.firestore().collection('domains').doc(this.domainId).collection('boards').doc(newBoard.id).set(data);
        const newDoc = await this.firebase.firestore().collection('domains').doc(this.domainId).collection('boards').doc(newBoard.id).get();

        // Get from firestore the list of boards in this domain. 
        // Then create a reference with the new boards added.
        const boardsRef = await this.firebase.firestore().collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').get()
        let existingBoards = boardsRef.data() && boardsRef.data().boards ? boardsRef.data().boards : [];
        existingBoards.push({ id: newDoc.id, title: 'Scratch' });

        // Update the boards in this domain with data from above.
        await this.firebase.firestore()
            .collection('domains')
            .doc(this.domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .set({
                boards: existingBoards
            });

        return Promise.resolve({ id: newDoc.id, ...newDoc.data() });
    }

    /**
     * Delete a individual board.
     * 
     * Parameter: id {string} - The id (guid) of the board to get.
     * 
    */
    delete() {

    }
}
