import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const DRForm = Form.create({
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
    const { allowWrite } = props;
    
    return (
        <Form className="table__row__cell__container" autoComplete="off">
            <FormItem className="date-cell">
                {getFieldDecorator('columnValue', {})(
                    <DatePicker disabled={!allowWrite} format="DD-MMM-YYYY" allowClear={true}/>
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
        <DRForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default DateRowForm;