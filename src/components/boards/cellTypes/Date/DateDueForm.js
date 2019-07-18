import React, { useState, useRef, useEffect } from 'react';
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
    const node = useRef();

    let closeJustCalled = false;

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click 
        setOpen(false);
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        // return current && current < moment().endOf('day');
    }

    const days = moment(props.columnValue.value).diff({hours: 0}, 'days');

    const determineColour = () => {

        const colorGroups = [
            { color: '#EB144C', max: (x) => (x <= 1) }, // red
            { color: '#FF6900', max: (x) => (x > 1 && x <= 3) }, // orange
            { color: '#FCB900', max: (x) => (x > 3 && x <= 10 ) }, // yellow
            { color: '#00D084', max: (x) => (x > 10 ) }, // green
        ];

        const color = colorGroups.filter(c => c.max(days))[0].color;
        return color;
    }
    
    return (
        <div ref={node} className="table__row__cell__container datedue__container">
            <div className="datedue" style={{ 'backgroundColor': determineColour() }} onClick={() => setOpen(true)}>
                <div className="datedue__placeholder" >
                    {days < 0 ? `+ ${Math.abs(days)} days` : `${days} days` } 
                </div>  
            </div>
            <Form className="datedue__form" autoComplete="off" style={{visibility: 'hidden', zIndex: 1}}>
                <FormItem className="datedue__date-cell">
                    {getFieldDecorator('columnValue', {})(
                        <DatePicker  format="DD-MMM-YYYY" allowClear={true} open={open} disabledDate={disabledDate} onChange={() => setOpen(false)}/>
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
        value: props.board && props.board.groups[props.groupKey] && props.board.groups[props.groupKey].entities[idx] ? props.board.groups[props.groupKey].entities[idx][props.modelName] : '',
        }
    };

    return (
        <DateDueForm {...fields} {...props} onChange={handleFormChange} />
    );
}


export default DateRowForm;