import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const DForm = Form.create({
    onValuesChange(props, values) {
        console.log(props);
        props.onChange(values.name);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            props.onCreateDomain(values.name)
        });
    }

    return (
        <Form className="new_domain__form" onSubmit={handleSubmit}>
            <FormItem 
                hasFeedback
                validateStatus={props.validateStatus}
                help={props.validateFeedback}
            >
                {getFieldDecorator('name', {
                    rules: [
                        { required: true, message: "We're gonna need a team name" },
                    ],
                })(
                    <Input size="large" prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your team name" autoComplete="off" />
                )}
            </FormItem>
            <Button type="dashed" htmlType="submit" className="domain__btn" loading={props.pending} disabled={!props.domainValid}>
                Create Team
                <Icon type="arrow-right" />
            </Button>
        </Form>
    )
});

const DomainForm = (props) => {

    const handleFormChange = (name) => {
        props.onCheckDomain(name);
    }

    return (
        <div style={{width: "100%" }}>
            <DForm {...props} onChange={handleFormChange} />
        </div>
    );
}


export default DomainForm;
