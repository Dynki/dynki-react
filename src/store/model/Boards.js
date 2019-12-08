import moment from 'moment';
import newGuid from '../utils/guid';

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
    get(id, dispatch, getState) {
        return new Promise(async (resolve, reject) => {

            const sub = this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boards')
                .doc(id)
                .onSnapshot({}, function (doc) {
                    const board = doc.data();
    
                    // Add the subscription to the current board so we can kill it later.
                    if (board) {
                        board.unsubscribe = sub;

                        if (!board.groups) {
                            board.groups = [{ id: newGuid(), name: 'Group 1', color: '2B82C1', entities: board.entities}];
                        }

                        if (dispatch && getState) {
                            const currentBoard = getState().boards.currentBoard;

                            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
                            if (currentBoard && currentBoard.id === board.id) {
                                dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
                                console.log('Board updated', resolve);
                            }
                        }


                        resolve(board);
                    }
                }, (err) => reject(err));
        });
    }

    async getBoardRoles(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const document = await this.firebase.firestore()
                    .collection('domains')
                    .doc(this.domainId)
                    .collection('boards')
                    .doc(id)
                    .collection('roles')
                    .doc('permissions')
                    .get();
                
                resolve(document.data().data);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    updateBoardRoles(boardId, roles) {
        return new Promise(async (resolve, reject) => {

            try {
                const batch = this.firebase.firestore().batch();

                const boardRolesRef = await this.firebase.firestore()
                    .collection('domains')
                    .doc(this.domainId)
                    .collection('boards')
                    .doc(boardId)
                    .collection('roles')
                    .doc('permissions');
        
                batch.set(boardRolesRef, { data: roles });
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
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
            }, (err) => reject(err));
        });
    }

    /**
     * Adds a new board.
     * 
     */
    async add() {
        try {
            
            const newBoard = {
                id: newGuid(),
                createdBy: this.firebase.auth().currentUser.uid,
                createdDate: moment().toDate(),
                description: '',
                title: 'Scratch',
                isFolder: false,
                entities: [{ id: 0, description: '' }],
                groups: [{ id: newGuid(), name: 'Group 1', color: '2B82C1', collapsed: false, entities: [{ id: newGuid(), description: '' }] }],
                columns: [{ title: 'Description', model: 'description', class: 'text' }],
                type: 'Scratch'
            }
    
            // Firebase requires the data to be parsed this way!!.
            const data = JSON.parse(JSON.stringify(newBoard));
    
            // Create the new board document, and then get it, to get it's ID.
            const newBoardRef = await this.firebase.firestore()
                .collection('domains').doc(this.domainId).collection('boards').doc(newBoard.id);
    
            const newBoardRolesRef = await this.firebase.firestore()
                .collection('domains').doc(this.domainId).collection('boards')
                .doc(newBoard.id).collection('roles').doc('permissions');
        
            // Update the boards in this domain with data from above.
            const appBoardsRef = this.firebase.firestore()
                .collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards');
    
            const boardRoles = { 
                read: ['BOARD_USERS'],
                write: ['BOARD_USERS'],
                delete: ['BOARD_USERS']
            }
    
            await this.firebase.firestore().runTransaction(async transaction => {
                const appBoardsDoc = await transaction.get(appBoardsRef);
    
                console.log('AppBoardDoc', appBoardsDoc);
    
                let existingBoards = appBoardsDoc.data() && appBoardsDoc.data().boards ? appBoardsDoc.data().boards : [];
                existingBoards.push({ id: newBoardRef.id, title: 'Scratch' });
    
                // Update app boards document which drives the menu
                transaction.set(appBoardsRef, { boards: existingBoards });
    
                // Add the new board document
                transaction.set(newBoardRef, data);
    
                transaction.set(newBoardRolesRef, { data: boardRoles });
            });
    
            return Promise.resolve({ id: newBoardRef.id, ...newBoard });
        } catch (error) {
            return Promise.reject(error);            
        }
    }

    async addFolder() {
        try {
            const newFolder = {
                id: newGuid(),
                title: 'New Folder',
                isFolder: true,
                items: []
            }
    
            // Firebase requires the data to be parsed this way!!.
    
            // Get from firestore the list of boards in this domain. 
            // Then create a reference with the new boards added.
            let existingBoards = await this.list();
            existingBoards.push(newFolder);
    
            // Update the boards in this domain with data from above.
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boardsInDomain')
                .doc('appBoards')
                .set({
                    boards: existingBoards
                });
    
            return Promise.resolve({ id: newFolder.id });
            
        } catch (error) {
            return Promise.reject(error);            
        }
    }

    async removeFolder(folderId) {
        try {
            
            // Get from firestore the list of boards in this domain. 
            let existingBoards = await this.list();
            existingBoards =  existingBoards.filter(b => b.id !== folderId);
    
            // Update the boards in this domain with data from above.
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boardsInDomain')
                .doc('appBoards')
                .set({
                    boards: existingBoards
                });
    
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);            
        }

    }

    async updateBoardTitle(boardId, updatedTitle) {
        try {
            // Get from firestore the list of boards in this domain. 
            let existingBoards = await this.list();
            existingBoards = existingBoards.map(b => {
                if (b.id === boardId) {
                    b.title = updatedTitle
                }
                return b;
            })
    
            // Update the boards in this domain with data from above.
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('boardsInDomain')
                .doc('appBoards')
                .set({
                    boards: existingBoards
                });
    
            return Promise.resolve();
            
        } catch (error) {
            return Promise.reject(error);            
        }
    }

    /**
     * Delete a individual board.
     * 
     * Parameter: id {string} - The id (guid) of the board to get.
     * 
    */
    delete(id) {
        return new Promise(async (resolve, reject) => {

            try {
                let boards = await this.list();
                boards = boards.filter(b => b.id !== id);
    
                const batch = this.firebase.firestore().batch();
                const appBoardsRef =  this.firebase.firestore()
                                        .collection('domains').doc(this.domainId)
                                        .collection('boardsInDomain').doc('appBoards');
    
                const boardsRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('boards')
                                    .doc(id);
    
                batch.delete(boardsRef);
                batch.set(appBoardsRef, { boards });
                await batch.commit();
    
                resolve();
                
            } catch (error) {
                reject(error);                
            }
        });
    }

    update(board) {
        return new Promise(async (resolve, reject) => {

            try {
                const boards = await this.list();
                const boardIdx = boards.findIndex(b => b.id === board.id);
    
                const batch = this.firebase.firestore().batch();
        
                const appBoardsRef =  this.firebase.firestore()
                                        .collection('domains').doc(this.domainId)
                                        .collection('boardsInDomain').doc('appBoards');
    
                const boardsRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('boards')
                                    .doc(board.id);
    
                if (boards[boardIdx].title !== board.title) {
                    boards[boardIdx].title = board.title;
                    batch.set(appBoardsRef, { boards });
                }
                delete board['unsubscribe'];
        
                batch.set(boardsRef, board);
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }
}
