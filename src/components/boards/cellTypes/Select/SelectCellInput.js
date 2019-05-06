import React from 'react';
import { Form, Input, Icon } from 'antd';

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

    let styling = 'select__input';
    let fieldStyling = 'select__field';

    if (props.selected) {
        fieldStyling += ' select__field--selected';
    }

    if (props.option.default) {
        fieldStyling += ' select__field--suffix';
        styling += ' select__input--suffix';
    }


    return (
        <div className="select__form">
            <Form autoComplete="nope" onSubmit={handleSubmit}>
                <FormItem>
                    <div className={fieldStyling}>
                        {getFieldDecorator('title', {
                            rules: [],
                        })(
                            <Input 
                            className={styling} 
                            readOnly={(props.option && props.option.disabled) ? true : false}
                            placeholder="Label goes here" 
                            autoComplete="nope" 
                            style={{backgroundColor: `#${props.option.color}`, color: `#${props.option.fgColor}`}}
                            onClick={() => props.onSelected()}
                            onBlur={() => handleSubmit()}
                            />
                        )}
                            <div 
                            className="select__suffix"
                            style={{backgroundColor: `#${props.option.color}`, color: `#${props.option.fgColor}`}}
                            >
                                <Icon type="pushpin" style={{
                                    color: props.option.default ? `#${props.option.fgColor}` : `#${props.option.color}`
                                }}/>
                            </div>
                    </div>
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