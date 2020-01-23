import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const DomainForm = ({ form, onUpdateDomain, pending, validateFeedback, validateStatus }) => {
    const { getFieldDecorator } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                onUpdateDomain(values.name)
            }
        });
    }

    return (
        <Form className="new_domain__form" onSubmit={handleSubmit}>
            <FormItem 
                hasFeedback
                validateStatus={validateStatus}
                help={validateFeedback}
            >
                {getFieldDecorator('name', {
                    rules: [
                        { required: true, message: "We're gonna need a team name" },
                        { max: 50, message: 'Toooo loooonnnnggg!!' },
                        { min: 3, message: 'Not long enough, try a longer name!' }
                    ],
                })(
                    <Input 
                        size="large"
                        autoFocus
                        disabled={pending}
                        prefix={<Icon type="team"
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter your team name"
                        autoComplete="off" 
                    />
                )}
            </FormItem>
            <FormItem>
                <Button id="btnCreateTeam" type="dashed" htmlType="submit" className="button" loading={pending} disabled={pending}>
                    Create Team
                </Button>
            </FormItem>
        </Form>
    )
};

export default Form.create()(DomainForm);
