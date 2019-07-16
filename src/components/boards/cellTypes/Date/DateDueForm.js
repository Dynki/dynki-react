import React, { useState } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const DateDueForm = Form.create({
    mapPropsToFields(props) {
        return {
          columnValue: Form.createFormField({
            ...props.columnValue,
            value: props.columnValue.value === '' ? null : moment(props.columnValue.value),
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    const [ open, setOpen ] = useState(false);

    const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
    }
    
    return (
        <Form className="table__row__cell__container" autoComplete="off" onClick={() => setOpen(!open)}>
            <div className="datedue__placeholder">
                {moment(props.columnValue.value).diff({hours: 0}, 'days')} days
            </div>
            <FormItem className="date-cell">
                {getFieldDecorator('columnValue', {})(
                    <DatePicker style={{visibility: 'hidden'}} format="DD-MMM-YYYY" allowClear={true} open={open} disabledDate={disabledDate}/>
                )}
            </FormItem>
        </Form>
    )
});

const DateRowForm = (props) => {

    const idx = props.board.groups[props.groupKey].entities.findIndex(r => props.rowId === r.id);

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        
        if (changedFields['columnValue']) {
            updatedBoard.groups[props.groupKey].entities[idx][props.modelName] = changedFields['columnValue'].toString();
        } else {
            updatedBoard.groups[props.groupKey].entities[idx][props.modelName] = "";
        }
        props.onUpdateBoard(updatedBoard);
        props.setHoverState(false);
    }

    const fields = {
        columnValue: {
        value: props.board && props.board.groups[props.groupKey] && props.board.groups[props.groupKey].entities[idx] ? props.board.groups[props.groupKey].entities[idx][props.modelName] : '',
        }
    };

    return (
        <DateDueForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default DateRowForm;