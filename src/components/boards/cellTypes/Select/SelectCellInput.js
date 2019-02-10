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

    let bgColor = props.col.color;
    if (props.selectedColor && props.selected) {
        bgColor = props.selectedColor;
    }

    let fgColor = 'ffffff';
    if (props.selectedFgColor && props.selected) {
        fgColor = props.selectedFgColor;
    }

    return (
        <div className="select__form">
            <Form autoComplete="off">
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className={"select__input " + (props.selected ? "select__input--selected" : "")} 
                        readOnly={(props.col && props.col.disabled) ? true : false}
                        placeholder="Label goes here" 
                        autoComplete="no way" 
                        ref={ref => { 
                            if(props.cellKey === 0) {
                                // ref.focus();
                            }  
                        }}
                        style={{backgroundColor: `#${bgColor}`, color: `#${fgColor}`}}
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
        value: this.props.col ? this.props.col.title : '',
        },
    };

    componentDidMount() {
        if (this.props.cellKey === this.props.selectedKey) {
            this.props.onSelected(this.props.cellKey, this.props.col);
        }
    }

    handleFormChange = (changedFields) => {
        console.log('ChangedFields::', changedFields);

        this.props.onTitleChanged(this.props.col, changedFields.title);
    }

    componentWillReceiveProps() {
        this.fields = {
            title: {
            value: this.props.col ? this.props.col.title : '',
            },
        };
    }

    onSelected = () => {
        this.props.onSelected(this.props.cellKey, this.props.col);
    }

    render() {
        return (
            <div>
                <SelectCForm 
                    {...this.fields}
                    cellKey={this.props.cellKey}
                    col={this.props.col}
                    selected={this.props.selectedKey === this.props.cellKey ? true : false}
                    onSelected={this.onSelected}
                    selectedColor={this.props.selectedColor}
                    selectedFgColor={this.props.selectedFgColor}
                    selectedValueObj={this.props.selectedValueObj}
                    onChange={this.handleFormChange} />
            </div>
        );
    }
}


export default SelectCellForm;