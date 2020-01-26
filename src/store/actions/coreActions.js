import * as axios from 'axios';

export const toggleFolderDrawer = () => {
    return (dispatch) => {
      dispatch({ type: 'TOGGLE_FOLDER_DRAWER' });
    }
}
  
export const obtainCountryCode = () => {
  return async (dispatch, getState, { getFirebase }) => {
    axios.get('https://ipapi.co/json/').then((response) => {
      const data = response.data;
      const countryCode = data && data.country_code ? data.country_code : 'UNKNOWN';
      
      dispatch({ type: 'SET_COUNTRY_CODE', payload: countryCode })
      dispatch({ type: 'SET_COUNTRY', payload: data })
    }).catch((error) => {
        console.log(error);
    });
  }
}

