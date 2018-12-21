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
            .get().then(function (doc) {
                const data = doc.data();
                const boards = data.boards;
                dispatch({ type: 'REFRESH_BOARDS', payload: boards });
            });
    }
}

export const getBoard = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BOARD', payload: id })

        const domainId = getState().auth.domainId;

        firebase.firestore()
            .collection('domains')
            .doc(domainId)
            .collection('boards')
            .doc(id)
            .get().then(function (doc) {
                const board = doc.data();
                dispatch({ type: 'SET_CURRENT_BOARD', payload: board });
            });
    }
}
