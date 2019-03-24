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
        props.onChange(props, values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        props.form.validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    }

    return (
        <div className="select__form">
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className={"select__input " + (props.selected ? "select__input--selected" : "")} 
                        readOnly={(props.option && props.option.disabled) ? true : false}
                        placeholder="Label goes here" 
                        autoComplete="no way" 
                        style={{backgroundColor: `#${props.option.color}`, color: `#${props.option.fgColor}`}}
                        onClick={() => props.onSelected()}
                        onBlur={() => handleSubmit()}
                        />
                    )}
                </FormItem>
            </Form>
        </div>
    )
});

class SelectCellForm extends React.Component {

    fields = {
        title: {
            value: this.props.option ? this.props.option.title : '',
        },
    }

    orignalValue = this.props.option ? this.props.option.title : '';
    title = '';

    constructor(props) {
        super(props);

        this.handleFormChange.bind(this);
        this.handleFormSubmit.bind(this);
    }

    componentWillReceiveProps() {
        this.fields = {
            title: {
                value: this.props.option ? this.props.option.title : '',
            },
        };
    }

    handleFormChange = (props, changedFields) => {
        this.title = changedFields.title;
    }

    handleFormSubmit = (changedFields) => {
        if (this.orignalValue !== this.title) {
            this.orignalValue = this.title;
            this.props.onTitleChanged(changedFields.title);
        }
    }

    onSelected = () => {
        this.props.onSelected(this.props.option);
    }

    render() {
        const { selectedOption, option } = this.props;

        return (
            <div>
                <SelectCForm 
                    {...this.fields}
                    option={option}
                    selected={selectedOption && option.key === selectedOption.key ? true : false}
                    onSelected={this.onSelected}
                    onSubmit={this.handleFormSubmit} 
                    onChange={this.handleFormChange} 
                />
            </div>
        );
    }
}

export default SelectCellForm;