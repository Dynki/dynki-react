import React from 'react';
import { Form, Input } from 'antd';
import * as _ from 'lodash';

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
                    <Input placeholder={props.colIdx === 0 ? "Enter some text here..." : ""} className="table__header__input text--no-border"/>
                )}
            </FormItem>
        </Form>
    )
});

const BoardRowForm = (props) => {

    const idx = props.board.group[this.props.groupKey].entities.findIndex(r => props.rowId === r.id);

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        
        updatedBoard.group[this.props.groupKey].entities[idx][props.modelName] = changedFields['columnValue'];
        props.onUpdateBoard(updatedBoard);
    }

    const fields = {
        columnValue: {
        value: props.board ? props.board.group[this.props.groupKey].entities[idx][props.modelName] : '',
        }
    };

    return (
        <BRForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default BoardRowForm;