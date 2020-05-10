
export const setInvite = (value) => {
    return (dispatch) => {
      dispatch({ type: 'SET_INVITE', payload: value });
    }
}
