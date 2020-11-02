import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { EnterOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox } from 'antd';

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

const LoginForm = ({ form, pending, signIn }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                signIn(values);
            }
        });
    }

    const { getFieldDecorator } = form;

    return (
        <StyledForm>
            <h1 className="heading">Welcome</h1>
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input an email!' },
                            { type: 'email', message: 'Not a valid email address!' }
                        ],
                    })(
                        <Input disabled={pending} autoFocus size="large" prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'Please input your Password!' }
                        ],
                    })(
                        <Input disabled={pending} id="password" size="large" prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox disabled={pending}>Remember me</Checkbox>
                    )}
                    <Link id="forgotPassword" className="login-form-forgot" to='/auth/forgot'>Forgot password</Link>
                    <Button id="loginbtn" type="dashed" htmlType="submit" className="button" loading={pending}>
                        Log In
                        <EnterOutlined />
                    </Button>
                    Or <Link id="register" to="/auth/signup">register now!</Link>
                </FormItem>
            </Form>
        </StyledForm>
    );
}

export default Form.create()(LoginForm);
