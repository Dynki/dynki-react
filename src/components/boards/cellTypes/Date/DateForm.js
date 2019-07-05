import React from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const DRForm = Form.create({
    mapPropsToFields(props) {
        return {
          columnValue: Form.createFormField({
            ...props.columnValue,
            value: moment(props.columnValue.value),
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
            <FormItem className="date-cell">
                {getFieldDecorator('columnValue', {})(
                    <DatePicker format="DD-MMM-YYYY"/>
                )}
            </FormItem>
        </Form>
    )
});

const DateRowForm = (props) => {

    const idx = props.board.groups[props.groupKey].entities.findIndex(r => props.rowId === r.id);

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        
        updatedBoard.groups[props.groupKey].entities[idx][props.modelName] = changedFields['columnValue'].toString();
        props.onUpdateBoard(updatedBoard);
    }

    const fields = {
        columnValue: {
        value: props.board && props.board.groups[props.groupKey] && props.board.groups[props.groupKey].entities[idx] ? props.board.groups[props.groupKey].entities[idx][props.modelName] : '',
        }
    };

    return (
        <DRForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default DateRowForm;