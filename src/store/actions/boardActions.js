export const getBoards = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARDS' })

        const domainId = getState().auth.domainId;

        firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boardsInDomain')
            .doc('appBoards')
            .onSnapshot({}, function (doc) {
                const data = doc.data();
                const boards = data.boards;
                dispatch({ type: 'REFRESH_BOARDS', payload: boards });
            });
    }
}

export const getBoard = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('GET BOARD::', id);
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARD', payload: id })

        const domainId = getState().auth.domainId;
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
        const domainId = getState().auth.domainId;
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

