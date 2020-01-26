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

    // onValuesChange(props, values) {
    //     props.onChange(values);
    // }
})((props) => {
    const { getFieldDecorator } = props.form;
    const { allowWrite } = props;

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
            }
            props.onChange(values);
        });
    }

    const handleBlur = () => {
        handleSubmit();
    }

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
                            disabled={!allowWrite} 
                            placeholder="Board title goes here" 
                            autoComplete="no way" 
                            onBlur={() => handleBlur()}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <Input 
                            className="text--no-border description"
                            placeholder="Add a board descripton"
                            disabled={!allowWrite} 
                            autoComplete="false"
                            onBlur={() => handleBlur()}
                        />
                    )}
                </FormItem>
            </Form>
        </div>
    )
});

const BoardForm = (props) => {

    const handleFormChange = (changedFields) => {
        if (changedFields.title !== props.board.title || changedFields.description !== props.board.description) {
            const updatedBoard = { ...props.board, ...changedFields }
            props.onUpdateBoard(updatedBoard);
        }
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
            <BForm {...fields} onChange={handleFormChange} allowWrite={props.allowWrite}/>
        </div>
    );
}


export default BoardForm;