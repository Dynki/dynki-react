import moment from 'moment';
import newGuid from '../utils/guid';

export const getBoards = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARDS' })

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

export const newBoard = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        const firebase = getFirebase();
        const domainId = getState().domain.domainId;

        const newBoard = {
            id: newGuid(),
            createdBy: firebase.auth().currentUser.uid,
            createdDate: moment().toDate(),
            description: '',
            title: 'Scratch',
            isFolder: false,
            entities: [],
            columns: [{ title: 'Description', model: 'description', class: 'text' }],
            type: 'Scratch'
        }

        const data = JSON.parse(JSON.stringify(newBoard));
        await firebase.firestore().collection('domains').doc(domainId).collection('boards').doc(newBoard.id).set(data);
        const newDoc = await firebase.firestore().collection('domains').doc(domainId).collection('boards').doc(newBoard.id).get();
        const boardsRef = await firebase.firestore().collection('domains').doc(domainId).collection('boardsInDomain').doc('appBoards').get()

        const newBoards = boardsRef.boards ? boardsRef.boards.push({ id: newDoc.id, title: 'Scratch' }) : [{ id: newDoc.id, title: 'Scratch' }];

        await firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .set({
                boards: newBoards
            });

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

        return Promise.resolve({ id: newDoc.id, ...newDoc.data() });
    }
}

export const getBoard = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('GET BOARD::', id);
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARD', payload: id })

        const domainId = getState().domain.domainId;
        const currentBoard = getState().boards.currentBoard;

        
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
                board.unsubscribe = sub;
                dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
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

