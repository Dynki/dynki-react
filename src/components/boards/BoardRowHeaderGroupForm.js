import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class GroupForm extends React.Component {

    handleBlur() {
        this.handleSubmit();
    }
    
    handleSubmit(e) {
        if (e) e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
            this.props.onChange(values);
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const id = 'groupTitle';
        
        return (
            <Form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem>
                    {getFieldDecorator(id, { validateTrigger: 'onBlur' })(
                        <Input 
                            style={{ color: this.props.groupColor }} 
                            className="table__header__input__group-title text--no-border"
                            onBlur={() => this.handleBlur()}
                        />
                    )}
                </FormItem>
            </Form>
        )
    }
}


const BRHGroupForm = Form.create({
    mapPropsToFields(props) {
        return {
          'groupTitle': Form.createFormField({
            ...props.groupTitle,
            value: props.groupTitle.value,
          })
        };
    },
})(GroupForm)

const BoardRowHeaderGroupForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        if (changedFields.groupTitle !== updatedBoard.groups[props.groupKey].name) {
            updatedBoard.groups[props.groupKey].name = changedFields['groupTitle'];
            props.onUpdateBoard(updatedBoard);
        }
    }

    const fields = {
        groupTitle: {
        value: props.board ? props.board.groups[props.groupKey].name : '',
        }
    };

    const groupColor = props.board.groups[props.groupKey].color ? '#' + props.board.groups[props.groupKey].color : '#000000a6';

    return (
        <BRHGroupForm {...fields} groupColor={groupColor} onChange={handleFormChange} />
    );
}


export default BoardRowHeaderGroupForm;