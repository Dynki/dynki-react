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
            .snapshotChanges(function (querySnapshot) {
                var boards = [];
                querySnapshot.forEach(function (doc) {
                    boards.push(doc.data());
                });
                dispatch({ type: 'REFRESH_BOARDS', payload: boards });
            });
    }
}

