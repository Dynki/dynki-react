import React, { useState } from 'react';
import { Drawer, Icon, Tabs } from 'antd';
import BoardSettingsForm from './BoardSettingsForm';
import styles from 'styled-components';

const StyledLink = styles.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
    }
`;

const TabPane = Tabs.TabPane;

const BoardSettingsDrawer = (props) => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <StyledLink onClick={showDrawer} ><Icon type="setting" style={{ paddingRight: '10px' }}/> Board settings</StyledLink>

            <Drawer
                title="Board settings"
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    paddingBottom: '108px',
                }}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="lock" />Permissions</span>} key="1">
                        <BoardSettingsForm/>
                    </TabPane>
                </Tabs>

            </Drawer>
        </React.Fragment>
    );
}

export default BoardSettingsDrawer;