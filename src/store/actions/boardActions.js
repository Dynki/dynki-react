export const getBoards = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        dispatch({ type: 'ATTEMPT_LOADING_BAORDS' })

        const domainId = getState().auth.domainId;
        console.log(firebase);

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

