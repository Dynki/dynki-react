import React from 'react';
import { Button, Divider, Drawer, Select, Typography } from 'antd';

const { Paragraph, Title } = Typography;
const { Option } = Select;

const TeamsInvite = (props) => {

    console.log('Invite visbility', props.visible);

    const children = props.members.map((m, idx) => <Option key={idx}>{m.email}</Option>);

    return (<Drawer
        title="Invite team members"
        placement="right"
        onClose={() => props.setDrawerVisibility(false)}
        visible={props.visible}
        getContainer={false}
        width={370}
        style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
        }}
        >

        <Title level={4}>
            Add email addresses of members you wish to invite.
        </Title>
        <Paragraph>
            You can look up existing members or type/paste email addresses in direct.
        </Paragraph>

        <Select
            placeholder="Enter email addresses" 
            mode="tags" 
            style={{ 
                width: '100%',
                minHeight: '300px;'
            }} 
            tokenSeparators={[',']}>
            {children}
        </Select>
        <Paragraph>
            max 50 invites at a time
        </Paragraph>
        <Divider />
        <Button loading={props.progress} icon="mail" block id="btnInvite" type="primary" htmlType="submit">Send invites</Button>
        </Drawer>
    );
}

export default TeamsInvite;
