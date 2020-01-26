import * as React from 'react';
import styled from 'styled-components';

const StyledDynkiBrand = styled.div`
    font-family: $font-family;
    font-weight: 400!important;
    font-size: 30px;
    color: black;
    opacity: 0.54 !important;
`;

const DynkiBrand = props => {
    return <StyledDynkiBrand id="brand">Dynki</StyledDynkiBrand>
}

export default DynkiBrand;