import React, { useState } from 'react';
import { Drawer, Icon, Tabs } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import UserProfileForm from './UserProfileForm';
import SubscriptionForm from './SubscriptionForm';
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
        // setVisible(true);
        props.history.push('/account');
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <StyledAnchor id="userProfile" onClick={showDrawer}><Icon type="robot" /> Account Details</StyledAnchor>

            {/* <Drawer
                title="Account Details"
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
                            <UserProfileForm/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="shopping-cart" />Subscription</span>} key="2">
                            <SubscriptionForm/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="lock" />Security</span>} key="3">
                            <WrappedResetPasswordForm/>
                        </TabPane>
                    </Tabs>

                </div>
            </Drawer> */}
        </React.Fragment>
    );
}

export default withRouter(UserProfileDrawer);