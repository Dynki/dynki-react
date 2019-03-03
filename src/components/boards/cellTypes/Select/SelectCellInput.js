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

    console.log('SelectCellForm::props', props);

    // let bgColor = props.option.color;
    // if (props.selectedColor && props.selected) {
    //     bgColor = props.selectedColor;
    // }

    // let fgColor = 'ffffff';
    // if (props.selectedFgColor && props.selected) {
    //     fgColor = props.selectedFgColor;
    // } else if (props.option.fgColor) {
    //     fgColor = props.option.fgColor;
    // }

    return (
        <div className="select__form">
            <Form autoComplete="off">
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
    };

    handleFormChange = (changedFields) => {
        console.log('ChangedFields::', changedFields);

        this.props.onTitleChanged(this.props.col, changedFields.title);
    }

    componentWillReceiveProps() {
        this.fields = {
            title: {
            value: this.props.option ? this.props.option.title : '',
            },
        };
    }

    onSelected = () => {
        this.props.onSelected(this.props.option);
    }

    render() {
        return (
            <div>
                <SelectCForm 
                    {...this.fields}
                    // cellKey={this.props.cellKey}
                    option={this.props.option}
                    selected={this.props.option.key === this.props.selectedOption.key ? true : false}
                    onSelected={this.onSelected}
                    // selectedColor={this.props.selectedColor}
                    // selectedFgColor={this.props.selectedFgColor}
                    // selectedValueObj={this.props.selectedValueObj}
                    onChange={this.handleFormChange} />
            </div>
        );
    }
}


export default SelectCellForm;