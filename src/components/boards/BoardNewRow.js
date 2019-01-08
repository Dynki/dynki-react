import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BNRForm = Form.create({
    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    return (
        <Form className="table__row__new" autoComplete="off">
            <FormItem >
                {getFieldDecorator('newValue', {})(
                    <Input placeholder="+ Create new row"/>
                )}
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