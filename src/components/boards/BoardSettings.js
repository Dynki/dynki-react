import React, { useState } from 'react';
import { Drawer, Icon, Tabs } from 'antd';

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
            <a onClick={showDrawer} ><Icon type="setting" style={{ paddingRight: '10px' }}/> Board settings</a>

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
                    </TabPane>
                </Tabs>

            </Drawer>
        </React.Fragment>
    );
}

export default BoardSettingsDrawer;