import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BRHForm = Form.create({
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
            <Form>
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className="text__large--no-border board__form__description"
                        size="large" 
                        placeholder="Board title goes here" 
                        autoComplete="false" />
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

const BoardRowHeaderForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = { ...props.board, ...changedFields }
        props.onUpdateBoard(updatedBoard);
    }

    const onUpdateBoard = (board) => {
        console.log('UPDATE Board with values::', board);
        props.onUpdateBoard(board);
    }

    const fields = {
        input: {
        value: props.board ? props.board.title : '',
        },
        description: {
            value: props.board ? props.board.description : ''
        }

    };

    return (
        <div>
            <BRHForm {...fields} onChange={handleFormChange} />
        </div>
    );
}


export default BoardRowHeaderForm;