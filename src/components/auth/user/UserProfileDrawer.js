import React, { useState } from 'react';
import { Drawer, Icon, Tabs } from 'antd';
import styled from 'styled-components';

import WrappedUserProfileForm from './UserProfileForm';
import WrappedResetPasswordForm from '../reset/ResetPasswordForm';

const TabPane = Tabs.TabPane;

const StyledAnchor = styled.a`
    margin: 10px;

    i {
        margin-right: 10px;
    }
`;

const UserProfileDrawer = (props) => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <StyledAnchor id="userProfile" onClick={showDrawer}><Icon type="robot" /> User Profile</StyledAnchor>

            <Drawer
                title="User Profile"
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: '100%',
                    paddingBottom: '108px',
                }}
            >
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="profile" />Profile</span>} key="1">
                            <WrappedUserProfileForm/>
                            </TabPane>
                        <TabPane tab={<span><Icon type="lock" />Security</span>} key="2">
                            <WrappedResetPasswordForm/>
                        </TabPane>
                    </Tabs>

                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default UserProfileDrawer;