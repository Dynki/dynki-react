import React, { useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import styled from 'styled-components';

import SideNav from './SideNav';

const StyledDrawer = styled(Drawer)`
    .ant-drawer-body {
        padding: 0px;
    }
`;

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
            <BarsOutlined onClick={showDrawer} className="sidenav-drawer__burger" />

            <StyledDrawer
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
            </StyledDrawer>
        </React.Fragment>
    );
}

export default SidenavDrawer;