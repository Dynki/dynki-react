import * as axios from 'axios';

export const toggleFolderDrawer = () => {
    return (dispatch) => {
      console.log('Toggling folder drawer');
      dispatch({ type: 'TOGGLE_FOLDER_DRAWER' });
    }
}
  
export const obtainCountryCode = () => {
  return async (dispatch, getState, { getFirebase }) => {
    axios.get('https://ipapi.co/json/').then((response) => {
      const data = response.data;
      const countryCode = data && data.country_code ? data.country_code : 'UNKNOWN';

      console.log('Setting country code:', countryCode);

      dispatch({ type: 'SET_COUNTRY_CODE', payload: countryCode })
    }).catch((error) => {
        console.log(error);
    });
  }
}
