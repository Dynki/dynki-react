import React, { useState } from 'react';
import { Drawer, Icon, Tabs } from 'antd';
import WrappedUserProfileForm from './UserProfileForm';
import WrappedResetPasswordForm from './ResetPasswordForm';

const TabPane = Tabs.TabPane;

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
            <a className="usermenu__item" href="#" onClick={showDrawer}><Icon type="robot" /> User Profile</a>

            <Drawer
                title="User Profile"
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
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