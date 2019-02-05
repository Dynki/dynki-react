import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const SelectCForm = Form.create({
    mapPropsToFields(props) {
        return {
          title: Form.createFormField({
            ...props.title,
            value: props.title.value,
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    console.log('BoardForm::props', props);

    return (
        <div className="select__form">
            <Form autoComplete="off">
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className="select__input"
                        placeholder="Label goes here" 
                        autoComplete="no way" 
                        style={{backgroundColor: `#${props.col.color}`}}
                        />
                    )}
                </FormItem>
            </Form>
        </div>
    )
});

const SelectCellForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = { ...props.board, ...changedFields }
        props.onUpdateBoard(updatedBoard);
    }

    const fields = {
        title: {
        value: props.col ? props.col.title : '',
        },
    };

    return (
        <div>
            <SelectCForm {...fields} col={props.col} onChange={handleFormChange} />
        </div>
    );
}


export default SelectCellForm;