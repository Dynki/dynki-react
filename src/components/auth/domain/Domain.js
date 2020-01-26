import React from 'react';
import styles from 'styled-components'

import DomainForm from './DomainForm';

const StyledForm = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    min-height: 378px;
    background-color: #ffffff;
    padding: 36px!important;
    width: 100%;
    height: 600px;

    .heading {
        color:  #3095de;;
        // font-family: Raleway;
        font-size: 37px;
        margin-bottom: 20px;
    }

    nz-form-item {
        width: 100%;
    }

    form {
        min-width: 100%;
    }

    .button {
        height: 73px;
        font-size: 35px;
        width: 100%;
    
        span {
            padding-right: 30px;
        }
    }
`;

const Domain = ({ checkDomain, updateDomain, domain, pending }) => {

    // Fire logic to persist the new domain name.
    const onUpdateDomain = name => {
        updateDomain(name);
    }
      
    return (
        <StyledForm>
            <h1 className="registration__heading">Name your team</h1>
            <h4>Give your team a name they can be proud of</h4>
            <DomainForm onUpdateDomain={onUpdateDomain} pending={pending}></DomainForm>
        </StyledForm>
    );
}

export default Domain;