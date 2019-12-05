import * as React from 'react';
import styled from 'styled-components';

const StyledDynkiLogo = styled.div`
    width: 40px;
    height: 43px;
    display: inline-block;
    background-image: url(/assets/img/logo-blue-sm.png), none;
    background-size: 40px 40px;

    animation: ${props => props.progress ? "rotate 2s ease infinite" : "none"};
`;

const DynkiLogo = ({ progress }) => {
    return <StyledDynkiLogo id="backToHome" progress={progress}/>
}

export default DynkiLogo;