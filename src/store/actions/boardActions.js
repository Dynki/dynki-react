import moment from 'moment';
import newGuid from '../utils/guid';
import * as _ from 'lodash';
 
// Get all boards within this user's domain/team.
export const getBoards = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'ATTEMPT_LOADING_BOARDS' })

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;

        firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .onSnapshot({}, function (doc) {
                const data = doc.data();

                if (data) {
                    const boards = data.boards;
                    dispatch({ type: 'REFRESH_BOARDS', payload: boards });
                }
            });
    }
}

// Create a new blank board with this user's domain/team.
export const newBoard = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;

        const newBoard = {
            id: newGuid(),
            createdBy: firebase.auth().currentUser.uid,
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
        await firebase.firestore().collection('domains').doc(domainId).collection('boards').doc(newBoard.id).set(data);
        const newDoc = await firebase.firestore().collection('domains').doc(domainId).collection('boards').doc(newBoard.id).get();

        // Get from firestore the list of boards in this domain. 
        // Then create a reference with the new boards added.
        const boardsRef = await firebase.firestore().collection('domains').doc(domainId).collection('boardsInDomain').doc('appBoards').get()
        let existingBoards = boardsRef.data().boards ? boardsRef.data().boards : [];
        existingBoards.push({ id: newDoc.id, title: 'Scratch' });

        // Update the boards in this domain with data from above.
        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .set({
                boards: existingBoards
            });

        // Get a refreshed list of boards in this domain and dispatch the REFRESH_BOARDS action to refresh the side menu.
        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .onSnapshot({}, function (doc) {
                const data = doc.data();

                if (data) {
                    const boards = data.boards;
                    dispatch({ type: 'REFRESH_BOARDS', payload: boards });
                    dispatch({ type: 'SET_CURRENT_BOARD', payload: newDoc.data() });
                }
            });

        dispatch({ type: 'SET_PROGRESS', payload: false });

        return Promise.resolve({ id: newDoc.id, ...newDoc.data() });
    }
}

// Get an individual board by id.
export const getBoard = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARD', payload: id })

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
                    dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
                }
            });

    }
}

export const updateBoard = (board) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('UPDATE BOARD::');
        const firebase = getFirebase();
        const boards = getState().boards.boards;
        const domainId = getState().domain.domainId;
        const boardIdx = boards.findIndex(b => b.id === board.id);

        if (boards[boardIdx].title !== board.title) {
            
            boards[boardIdx].title = board.title;

            firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .set({ boards }).then(() => {
                dispatch({ type: 'REFRESH_BOARDS', payload: boards })
            })
        }

        dispatch({ type: 'ATTEMPT_UPDATE_BOARD', payload: board })

        delete board['unsubscribe'];

        firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(board.id)
            .set(board);
    }
}


export const newRow = (row) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });

        console.log('ADD BOARD ROW::');
        const firebase = getFirebase();
        const currentBoard = getState().boards.currentBoard;
        const domainId = getState().domain.domainId;

        // Add the new row to the current board, this MUST include the columns too.
        currentBoard.entities.push({ id: newGuid(), description: row.description });

        // Need to remove subscription function before saving.
        const updatedBoard = _.cloneDeep(currentBoard);
        delete updatedBoard.unsubscribe;

        const data = JSON.parse(JSON.stringify(updatedBoard));

        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(data.id)
            .set(data);

            dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

export const removeRow = (rowIdxToRemove) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'SET_PROGRESS', payload: true });
        console.log('REMOVE BOARD ROW::');
        const firebase = getFirebase();
        const currentBoard = getState().boards.currentBoard;
        const domainId = getState().domain.domainId;

        // Add the new row to the current board, this MUST include the columns too.
        currentBoard.entities = currentBoard.entities.filter((e, idx) => idx !== rowIdxToRemove);

        // Need to remove subscription function before saving.
        const updatedBoard = _.cloneDeep(currentBoard);
        delete updatedBoard.unsubscribe;

        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(updatedBoard.id)
            .set(updatedBoard);

        dispatch({ type: 'SET_PROGRESS', payload: false });
    }
}

// Remove the specified board via the board id supplied
export const removeBoard = (boardId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'SET_PROGRESS', payload: true });

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;

        // Create the new board document, and then get it, to get it's ID.
        await firebase.firestore().collection('domains').doc(domainId).collection('boards').doc(boardId).delete();

        // Get from firestore the list of boards in this domain. 
        // Then create a reference with the new boards added.
        const boardsRef = await firebase.firestore().collection('domains').doc(domainId).collection('boardsInDomain').doc('appBoards').get()
        let existingBoards = boardsRef.data().boards ? boardsRef.data().boards.filter(b => b.id !== boardId) : [];

        // Update the boards in this domain with data from above.
        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .set({
                boards: existingBoards
            });

        let nextBoardId;   
            
        // Get a refreshed list of boards in this domain and dispatch the REFRESH_BOARDS action to refresh the side menu.
        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .onSnapshot({}, function (doc) {
                const data = doc.data();

                if (data) {
                    const boards = data.boards;
                    dispatch({ type: 'REFRESH_BOARDS', payload: boards });
                }
            });

        const currentBoard = getState().boards.currentBoard;
        const currentBoards = getState().boards.boards;

        if (currentBoards) {
            nextBoardId = currentBoards[0].id;
        }

        // This is required to stop firestore creating multiple subscriptions, which then spam the system.
        if (currentBoard && currentBoard.unsubscribe) {
            currentBoard.unsubscribe();
        }
    
        if (nextBoardId) {
            const sub = firebase.firestore()
                .collection('domains')
                .doc(domainId)
                .collection('boards')
                .doc(nextBoardId)
                .onSnapshot({}, function (doc) {
                    const board = doc.data();
    
                    // Add the subscription to the current board so we can kill it later.
                    if (board) {
                        board.unsubscribe = sub;
                        console.log('RemoveBoard::SettingCurrentBoard::', board);
                        dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
                        dispatch({ type: 'SET_PROGRESS', payload: false });
                    }
                });
        }

        return Promise.resolve();
    }
}
