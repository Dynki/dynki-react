import React, { useState } from 'react';
import { Form, DatePicker } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import newGuid from '../../../../store/utils/guid';

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

    const uniqueId = newGuid();

    let closeJustCalled = false;

    const closeDate = () => {
        console.log('Close date');
        closeJustCalled = true;
        setOpen(false);
    }

    const openDate = () => {
        console.log('Open Date')

        if (!closeJustCalled) {
            setOpen(true);
        } else {
            closeJustCalled = false;
        }
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const determineColour = () => {
        const days = moment(props.columnValue.value).diff({hours: 0}, 'days');
        const color = days <= 3 ? '#EB144C' : (days > 3 && days < 14 ? '#FCB900' : '#00D084');
        return color;
    }
    
    const getCalendarContainer = () => {
        return document.getElementById(uniqueId);
    }

    return (
        <Form className="table__row__cell__container" autoComplete="off" onClick={openDate}>
            <div id={uniqueId} className="datedue" style={{ 'backgroundColor': determineColour() }}>
                <div className="datedue__placeholder" >
                    {moment(props.columnValue.value).diff({hours: 0}, 'days')} days
                </div>  
            </div>
            <FormItem className="datedue__date-cell">
                {getFieldDecorator('columnValue', {})(
                    <DatePicker style={{visibility: 'hidden', zIndex: 1}} format="DD-MMM-YYYY" allowClear={true} open={open} disabledDate={disabledDate} onChange={closeDate}/>
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