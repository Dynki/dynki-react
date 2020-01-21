import { Domains } from '../model/Domains';

export const checkDomain = (name) => {

    const domainValidForSubmission = (value, dispatch) => {

        if (value === undefined || value === null || value.length === 0) {
            return false;
        }

        if (value.length > 0 && value.length < 4) {
            dispatch({ type: 'DOMAIN_TOO_SHORT' })
            return false;
        }

        if (value.length > 50) {
            dispatch({ type: 'DOMAIN_TOO_LONG' })
            return false;
        }

        
        const re = RegExp('^[0-9a-zA-Z \b]+$');
        if (value.length > 0 && !re.test(value)) {
            dispatch({ type: 'DOMAIN_INVALID_CHARS' })
            return false;

        }

        return true;
    }

    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'VALIDATING_DOMAIN' })

        if (!domainValidForSubmission(name, dispatch)) {
            return;
        }

        dispatch({ type: 'DOMAIN_OK' })
    }
}

export const updateDomain = (name) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'SET_PROGRESS', payload: true });

        try {
            console.log('Domain actions: domain', getState().domain);

            const domainId = getState().domain.hiddenId
            const domainsHelper = new Domains(getFirebase());
            await domainsHelper.update(domainId, name);

            dispatch({ type: 'SET_DOMAIN', payload: domainId });

        } catch (error) {
           dispatch({ type: 'DOMAIN_CREATION_ERROR' })
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false });
        }
    }
}