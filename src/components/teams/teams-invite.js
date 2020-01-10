import React from 'react';
import { Button, Divider, Drawer, Select, Typography, Form } from 'antd';

const { Paragraph, Title } = Typography;
const { Option } = Select;

class TeamsInviteForm extends React.Component {

    constructor(props) {
        super(props);

        this.children = props.members.map((m, idx) => <Option key={idx}>{m.email}</Option>);
        this.state = { emailValues: [] };
    }

    handleChange = emailValues => {
        this.setState({ emailValues });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.inviteMember(values.emails);
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
        <Drawer
            title="Invite team members"
            placement="right"
            onClose={() => this.props.setDrawerVisibility(false)}
            visible={this.props.visible}
            getContainer={false}
            width={370}
            style={{
                overflow: 'auto',
                height: '100%',
                paddingBottom: '108px',
            }}
        >
            <Title level={4}>
                Add email addresses of members you wish to invite.
            </Title>
            <Paragraph>
                You can look up existing members or type/paste email addresses in direct.
            </Paragraph>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('emails', {
                    rules: [{ required: true, message: 'Please input an email address!' }],
                })(
                    <Select
                        data-testid="inviteSelect"
                        placeholder="Enter email addresses" 
                        mode="tags"
                        maxTagCount={50}
                        maxTagTextLength={200}
                        style={{ 
                            width: '100%'
                        }} 
                        tokenSeparators={[',']}
                        onChange={this.handleChange}
                    >
                        {this.children}
                    </Select>
                )}
                </Form.Item>
                <Paragraph>
                    max 50 invites at a time
                </Paragraph>
                <Divider />
                <Button 
                    data-testid="sendInvitesButton"
                    loading={this.props.progress} 
                    icon="mail" 
                    block id="btnInvite" 
                    type="primary" 
                    htmlType="submit"
                >
                    Send invites
                </Button>
            </Form>       
        </Drawer>
        );
    }
}

const TeamsInvite = Form.create({ name: 'team_invite' })(TeamsInviteForm);

export default TeamsInvite;
