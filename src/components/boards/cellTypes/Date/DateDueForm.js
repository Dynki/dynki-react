import React, { useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const DateDueForm = Form.create({
    mapPropsToFields(props) {
        return {
          columnValue: Form.createFormField({
            ...props.columnValue,
            value: props.columnValue.value === '' || props.columnValue.value === undefined ? null : moment(props.columnValue.value),
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;
    const { allowWrite } = props;

    const [ open, setOpen ] = useState(false);

    const days = moment(props.columnValue.value).startOf('day').diff({hours: 0}, 'days');
    const daysText = Math.abs(days) === 1 ? 'day' : 'days';

    const datePickerStatus = status => {
        if (!status) {
            setOpen(false);
        }
    };

    const determineColour = () => {

        const colorGroups = [
            { color: '#EB144C', max: (x) => (x <= 1) }, // red
            { color: '#FF6900', max: (x) => (x > 1 && x <= 3) }, // orange
            { color: '#FCB900', max: (x) => (x > 3 && x <= 10 ) }, // yellow
            { color: '#00D084', max: (x) => (x > 10 ) }, // green
        ];
        
        let color = '#59575A';
        if (!isNaN(days)) {
            color = colorGroups.filter(c => c.max(days))[0].color;
        }
            
        return color;
    }

    const openPicker = () => {
        if (allowWrite) {
            setOpen(true);
        }
    }
    
    return (
        <div className="table__row__cell__container datedue__container">
            <div className="datedue" style={{ 'backgroundColor': determineColour() }} onClick={() => openPicker()}>
                <div className="datedue__placeholder" >
                    {isNaN(days) ? 'Select date' : (days < 0 ? `+ ${Math.abs(days)} ${daysText}` : `${days} ${daysText}`) } 
                </div>  
            </div>
            <Form className="datedue__form" autoComplete="off" style={{visibility: 'hidden', zIndex: 1}}>
                <FormItem className="datedue__date-cell">
                    {getFieldDecorator('columnValue', {})(
                        <DatePicker disabled={!allowWrite} format="DD-MMM-YYYY" open={open} onChange={() => setOpen(false)} onOpenChange={datePickerStatus}/>
                    )}
                </FormItem>
            </Form>
        </div>
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
        value: props.board && props.board.groups[props.groupKey] && props.board.groups[props.groupKey].entities[idx] && props.board.groups[props.groupKey].entities[idx][props.modelName] ? props.board.groups[props.groupKey].entities[idx][props.modelName] : '',
        }
    };

    return (
        <DateDueForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default DateRowForm;