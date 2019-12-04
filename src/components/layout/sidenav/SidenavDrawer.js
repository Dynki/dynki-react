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
                width={250}
                onClose={onClose}
                className="sidenav-drawer"
                visible={visible}
                placement="left"
                style={{
                    overflow: 'auto',
                    height: '100%',
                    paddingBottom: '108px',
                    'paddingTop': '0px',
                    'zIndex': '20000'
                }}
            >
                <SideNav hideHome={true} domainName={props.domain.displayName}></SideNav>
            </Drawer>
        </React.Fragment>
    );
}

export default SidenavDrawer;