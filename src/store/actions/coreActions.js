
export const toggleFolderDrawer = () => {
    return (dispatch) => {
      console.log('Toggling folder drawer');
      dispatch({ type: 'TOGGLE_FOLDER_DRAWER' });
    }
  }
  