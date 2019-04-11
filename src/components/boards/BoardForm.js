import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BForm = Form.create({
    mapPropsToFields(props) {
        return {
          title: Form.createFormField({
            ...props.title,
            value: props.title.value,
          }),
          description: Form.createFormField({
            ...props.description,
            value: props.description.value
          }),
        };
    },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    return (
        <div className="board__form">
            <Form autoComplete="off">
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className="text__large--no-border board__form__description"
                        size="large" 
                        placeholder="Board title goes here" 
                        autoComplete="no way" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <Input className="text--no-border description" placeholder="Add a board descripton" autoComplete="false"/>
                    )}
                </FormItem>
            </Form>
        </div>
    )
});

const BoardForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = { ...props.board, ...changedFields }
        props.onUpdateBoard(updatedBoard);
    }

    const fields = {
        title: {
        value: props.board ? props.board.title : '',
        },
        description: {
            value: props.board ? props.board.description : ''
        }

    };

    return (
        <div>
            <BForm {...fields} onChange={handleFormChange} />
        </div>
    );
}


export default BoardForm;