import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BRForm = Form.create({
    mapPropsToFields(props) {
        return {
          [props.modelName + props.rowId]: Form.createFormField({
            ...props.columnValue,
            value: props.columnValue.value,
          })
        };
    },

    // onValuesChange(props, values) {
    //     props.onChange(values);
    // }
})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        if (e) e.preventDefault();


        props.form.validateFields((err, values) => {
            if (!err && values[props.modelName + props.rowId] !== undefined) {
                props.onChange(values);
            }
        });
    }

    const handleBlur = () => {
        handleSubmit();
    }
    const { allowWrite, colIdx } = props;
    
    return (
        <Form className="table__row__cell__container" autoComplete="off">
            <FormItem >
                {getFieldDecorator(props.modelName + props.rowId, {})(
                    <Input 
                        id={props.modelName}
                        disabled={!allowWrite}
                        placeholder={colIdx === 0 ? "Enter some text here..." : ""}
                        className="table__header__input text--no-border"
                        onBlur={() => handleBlur()}
                    />
                )}
            </FormItem>
        </Form>
    )
});

class BoardRowForm extends React.Component {

    idx = null;
    fields = null;

    constructor(props) {
        super(props);

        this.idx = props.board.groups[props.groupKey].entities.findIndex(r => props.rowId === r.id);

        this.fields = {
            columnValue: {
            value: props.board && props.board.groups[props.groupKey] 
                && props.board.groups[props.groupKey].entities[this.idx] ? 
                props.board.groups[props.groupKey].entities[this.idx][props.modelName] : '',
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // const oldVal = this.props.board.groups[this.props.groupKey].entities[this.idx][this.props.modelName];
        // const newVal = nextProps.board.groups[nextProps.groupKey].entities[this.idx][nextProps.modelName]
        // return !oldVal || oldVal !== newVal;
        return false;
    }

    handleFormChange = (changedFields) => {
        const updatedBoard = this.props.board;
        
        updatedBoard.groups[this.props.groupKey].entities[this.idx][this.props.modelName] = changedFields[this.props.modelName + this.props.rowId];
        this.props.onUpdateBoard(updatedBoard);
    }


    render() {
        return (
            this.fields && this.props ? 
            <BRForm {...this.fields} {...this.props} onChange={this.handleFormChange} />
            : null
        );
    }
}


export default BoardRowForm;