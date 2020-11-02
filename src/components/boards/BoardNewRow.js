import React from 'react';
import { EnterOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import styles from 'styled-components';

const NewRowButton = styles(Button)`
    border-radius: 0px;
    margin-top: 1px;
    background-color: #3095DE;
    color: #fff;
    height: 40px;

    :hover {
        color: #ffffff;
    }

    :disabled{
        background-color: #ffffff;
        cursor: not-allowed!important;
    }
`;

const StyledInput = styles(Input)`
    :disabled{
        background-color: #ffffff;
        cursor: not-allowed!important;
    }
`;

const FormItem = Form.Item;

const BNRForm = Form.create({})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
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
                        <StyledInput disabled={!props.allowWrite} placeholder="+ Create new row"/>
                    )}
                    <NewRowButton 
                        disabled={!props.allowWrite}
                        htmlType="submit"
                        style={{ backgroundColor: '#' + props.group.color }}
                    >
                        Create
                        {props.progress ? <LoadingOutlined /> : <EnterOutlined />}
                    </NewRowButton>
                </div>
            </FormItem>
        </Form>
    );
});

const BoardNewRow = (props) => {

    const handleFormChange = (changedFields) => {
        const newRow = { description: changedFields['newValue'], groupKey: props.groupKey };
        props.onNewRow(newRow, props.groupKey);
    }

    return (
        <BNRForm {...props} onChange={handleFormChange} />
    );
}

export default BoardNewRow;