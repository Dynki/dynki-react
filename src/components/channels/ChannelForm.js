import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import styles from 'styled-components';

const FormItem = Form.Item;

const Container = styles.div`
    padding: 10px;
    padding-bottom: 0px;

    .description {
        margin-top: 4px;
        margin-left: 3px;

        &:disabled{
            background-color: #ffffff;
            cursor: not-allowed!important;
        }
    }

    .ant-form-item {
        margin-bottom: 0px!important;
    }
`;

const StyledInput = styles(Input)`
    margin-left: 2px;
    color: #3095DE!important;

    &:disabled{
        background-color: #ffffff;
        cursor: not-allowed!important;
    }
`;

const CForm = Form.create({
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
        <Container>
            <Form autoComplete="off">
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <StyledInput 
                            className="text__large--no-border"
                            size="large"
                            disabled={!allowWrite} 
                            placeholder="Channel title goes here" 
                            autoComplete="no way" 
                            onBlur={() => handleBlur()}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <StyledInput 
                            className="text--no-border description"
                            placeholder="Go on give the channel a meaning"
                            disabled={!allowWrite} 
                            autoComplete="false"
                            onBlur={() => handleBlur()}
                        />
                    )}
                </FormItem>
            </Form>
        </Container>
    )
});

const ChannelForm = (props) => {

    const handleFormChange = (changedFields) => {
        if (changedFields.title !== props.channel.title || changedFields.description !== props.channel.description) {
            const updatedChannel = { ...props.channel, ...changedFields }
            props.onUpdateChannel(updatedChannel);
        }
    }

    const fields = {
        title: {
        value: props.channel ? props.channel.title : '',
        },
        description: {
            value: props.channel ? props.channel.description : ''
        }

    };

    return (
        <div>
            <CForm {...fields} onChange={handleFormChange} allowWrite={props.allowWrite}/>
        </div>
    );
}


export default ChannelForm;