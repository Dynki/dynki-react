import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const StyledForm = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    min-height: 378px;
    background-color: #ffffff;
    padding: 36px!important;
    width: 100%;
    height: 600px;

    .heading {
        color:  #3095de;;
        // font-family: Raleway;
        font-size: 37px;
        margin-bottom: 20px;
    }

    nz-form-item {
        width: 100%;
    }

    form {
        min-width: 100%;
    }

    .button {
        height: 73px;
        font-size: 35px;
        width: 100%;
    
        span {
            padding-right: 30px;
        }
    }
`;

const ForgotForm = ({ forgotPassword, form, pending }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                forgotPassword(values.email);
            }
        });
    }

    const { getFieldDecorator } = form;
    
    return (
        <StyledForm>
            <h1 className="login__heading">Forgot your password?</h1>
            <h2>Don't worry I do it all the time</h2>
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input an email!' },
                            { type: 'email', message: 'Not a valid email address!' }
                        ],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <Button style={{'margin-bottom': 10}} id="submitbtn" type="dashed" htmlType="submit" className="button" loading={pending}>
                    Send Email
                    <Icon type="enter"/>
                </Button>
                Or <Link id="backToLogin" to="/auth/login">back to login</Link>
            </Form>
        </StyledForm>
    );
}

export const Forgot = Form.create()(ForgotForm);
export default Forgot;