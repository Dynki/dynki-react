import * as React from 'react';
import styled from 'styled-components';
import { Dropdown, Icon, Menu } from 'antd';

import UserProfileDrawer from '../../auth/UserProfileDrawer';

const StyledContent = styled.div`
    background-color: #3095de;
    color: #ffffff;
    font-family: $font-family;
    font-size: 18px;

    width: 30px;
    height: 30px;
    margin: 10px;
    margin-right: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    margin-left: auto;

    &:hover {
        cursor: pointer;
    }
`;

const StyledAnchor = styled.a`
    margin: 10px;

    i {
        margin-right: 10px;
    }
`;

const UserProfileAvatar = ({ currentUser, signOut }) => {

    const displayName = currentUser.displayName;
    const avatarInitial = displayName && displayName.length > 0 ? displayName[0] : currentUser.email[0];

    const menu = (
        <Menu>
            <Menu.Item>
                <UserProfileDrawer/>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <StyledAnchor id="logout" onClick={signOut}>
                    <Icon type="logout" /> Log Out
                </StyledAnchor>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <StyledContent id="userprofile-icon">{avatarInitial}</StyledContent>
        </Dropdown>
    )
}

export default UserProfileAvatar;