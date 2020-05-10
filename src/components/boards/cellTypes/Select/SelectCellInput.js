import React from 'react';
import { Form, Input, Icon } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

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

    const shadeColor = (color, percent) => {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
    
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  
    
        var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
    }


    return (
        <Draggable key={'value' + props.index} draggableId={'value-' + props.index.toString()} index={props.index}>
        {provided => (
            <div 
                ref={provided.innerRef} {...provided.draggableProps}
                className="select__form"
            >
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
                                className="select__suffix draghandle"
                                {...provided.dragHandleProps}
                                style={{backgroundColor: shadeColor('#'+props.option.color, -40), color: `#${props.option.fgColor}`}}
                                >
                                    <Icon type="crown" style={{
                                        color: props.option.default ? `#${props.option.fgColor}` : shadeColor('#'+props.option.color, -40)
                                    }}/>
                                </div>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )}
    </Draggable>
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
            <React.Fragment>
                <SelectCForm 
                    {...this.fields}
                    option={option}
                    index={this.props.index}
                    provided={this.props.provided}
                    selected={selectedOption && option.key === selectedOption.key ? true : false}
                    onSelected={this.onSelected}
                    onSubmit={this.handleFormSubmit} 
                    onChange={this.handleFormChange} 
                />
            </React.Fragment>
        );
    }
}

export default SelectCellForm;