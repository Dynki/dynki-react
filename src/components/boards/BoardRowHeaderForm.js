import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BRHForm = Form.create({
    mapPropsToFields(props) {
        return {
          headerValue: Form.createFormField({
            ...props.headerValue,
            value: props.headerValue.value,
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    return (
        <Form>
            <FormItem>
                {getFieldDecorator('headerValue', {})(
                    <Input className="table__header__input text--no-border" autoComplete="false" />
                )}
            </FormItem>
        </Form>
    )
});

const BoardRowHeaderForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        updatedBoard.columns[props.colIdx] = changedFields['headerValue'];
        props.onUpdateBoard(updatedBoard);
    }

    const onUpdateBoard = (board) => {
        console.log('UPDATE Board with values::', board);
        props.onUpdateBoard(board);
    }

    const fields = {
        headerValue: {
        value: props.board ? props.board.columns[props.colIdx].title : '',
        }
    };

    return (
        <BRHForm {...fields} onChange={handleFormChange} />
    );
}


export default BoardRowHeaderForm;