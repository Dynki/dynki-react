import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <h1 className="login__heading">Welcome</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="dashed" htmlType="submit" className="domain__btn">
                            Sign In
                            <Icon type="enter" />
                </Button>
                        Or <Link to="/auth/signup">register now!</Link>
                    </FormItem>
                </Form>

            </div>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;