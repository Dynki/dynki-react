import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

export const DForm = Form.create({
    onValuesChange(props, values) {
        props.onChange(values.name);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                props.onCreateDomain(values.name)
            }
        });
    }

    const validateTeamName = (rule, value, callback) => {

        const isValid = value => {
            return new RegExp(/^(\d|\w)+$/).test(value);
        }
 
        if (isValid(value)) {
            callback();
        } else {
            callback('No spaces or special characters');
        }

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
                        { validator: validateTeamName },
                        { max: 50, message: 'Toooo loooonnnnggg!!' },
                        { min: 3, message: 'Not long enough, try a longer name!' }
                    ],
                })(
                    <Input 
                        size="large"
                        prefix={<Icon type="team"
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter your team name"
                        autoComplete="off" 
                    />
                )}
            </FormItem>
            <FormItem>
                <Button id="btnCreateTeam" type="dashed" htmlType="submit" className="domain__btn" loading={props.pending} disabled={props.pending}>
                    New Team
                    <Icon type="arrow-right" />
                </Button>
            </FormItem>
        </Form>
    )
});

const DomainForm = (props) => {

    const handleFormChange = (name) => {
        // props.onCheckDomain(name);
    }

    return (
        <div style={{width: "100%" }}>
            <DForm {...props} onChange={handleFormChange} />
        </div>
    );
}


export default DomainForm;
