import React, { useState } from 'react';
import { Drawer, Icon } from 'antd';
import WrappedUserProfileForm from './UserProfileForm';

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
                    <WrappedUserProfileForm/>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default UserProfileDrawer;