import * as React from 'react';
import styled from 'styled-components';

import SidenavDrawer from '../sidenav/SidenavDrawer';
import DynkiLogo from './DynkiLogo';
import DynkiBrand from './DynkiBrand';
import UserProfileAvatar from './UserProfileAvatar';

const StyledToolbar = styled.div`
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    border-bottom: 1px solid #d7d7d7;

    grid-column-start: 1;
    grid-column-end: span 3;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-content: center;
    align-items: center;
    padding-left: 24px;

    position: fixed;
    width: 100%;
    height: 65px;
    z-index: 10;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        padding-left: 12px;

        .anticon {
            font-size: 26px;
            margin-right: 10px;
        }
    }
`;

const Toolbar = ({ currentUser, domain, progress, signOut }) => {

    return (
        <StyledToolbar>
            <SidenavDrawer domain={domain}/>
            <DynkiLogo progress={progress}/>
            <DynkiBrand/>
            <UserProfileAvatar currentUser={currentUser} signOut={signOut}/> 
        </StyledToolbar>
    )
}

export default Toolbar;