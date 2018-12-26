import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BRForm = Form.create({
    mapPropsToFields(props) {
        return {
          columnValue: Form.createFormField({
            ...props.columnValue,
            value: props.columnValue.value,
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    return (
        <Form className="table__row__cell__container" autoComplete="off">
            <FormItem >
                {getFieldDecorator('columnValue', {})(
                    <Input className="table__header__input text--no-border"/>
                )}
            </FormItem>
        </Form>
    )
});

const BoardRowForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        updatedBoard.entities[props.rowIdx][props.modelName] = changedFields['columnValue'];
        props.onUpdateBoard(updatedBoard);
    }

    const onUpdateBoard = (board) => {
        console.log('UPDATE Board with values::', board);
        props.onUpdateBoard(board);
    }

    const fields = {
        columnValue: {
        value: props.board ? props.board.entities[props.rowIdx][props.modelName] : '',
        }
    };

    return (
        <BRForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default BoardRowForm;