import React from 'react';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

const BNRForm = Form.create({})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            props.onChange(values);
        });
        props.form.resetFields();
    }

    return (
        <Form className="table__row__new" autoComplete="off" onSubmit={handleSubmit}>
            <FormItem >
                <div className="new-row">
                    {getFieldDecorator('newValue', { })(
                        <Input placeholder="+ Create new row"/>
                    )}
                    <Button htmlType="submit" className="new-row__btn">
                        Create
                        {props.progress ? <Icon type="loading" /> : <Icon type="enter"/>}
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
});

const BoardNewRow = (props) => {

    const handleFormChange = (changedFields) => {
        const newRow = { description: changedFields['newValue'] };
        props.onNewRow(newRow);
    }

    return (
        <BNRForm {...props} onChange={handleFormChange} />
    );
}

export default BoardNewRow;