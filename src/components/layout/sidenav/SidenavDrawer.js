import React, { useState } from 'react';
import { Drawer, Icon } from 'antd';
import SideNav from './SideNav';

const SidenavDrawer = (props) => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <Icon type="bars" onClick={showDrawer} className="sidenav-drawer__burger"/>

            <Drawer
                title="Main menu"
                width={370}
                onClose={onClose}
                className="sidenav-drawer"
                visible={visible}
                placement="left"
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                    'padding-top': '0px'
                }}
            >
                <div>
                    <SideNav domainName={props.domain.displayName}></SideNav>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default SidenavDrawer;