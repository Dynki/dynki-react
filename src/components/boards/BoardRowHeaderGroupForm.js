import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BRHGroupForm = Form.create({
    mapPropsToFields(props) {
        return {
          'groupTitle': Form.createFormField({
            ...props.groupTitle,
            value: props.groupTitle.value,
          })
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;
    const id = 'groupTitle';

    return (
        <Form autoComplete="off">
            <FormItem>
                {getFieldDecorator(id, {})(
                    <Input style={{ color: props.groupColor }} className="table__header__input__group-title text--no-border"/>
                )}
            </FormItem>
        </Form>
    )
});

const BoardRowHeaderGroupForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        updatedBoard.groups[props.groupKey].name = changedFields['groupTitle'];
        props.onUpdateBoard(updatedBoard);
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