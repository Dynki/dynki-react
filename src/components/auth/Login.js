import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { signIn } from '../../store/actions/authActions';

const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            this.props.signIn(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { auth } = this.props;

        if (auth.uid) {
            console.log('Login::Auth::Uid', auth.uid)
            return <Redirect to='/' />
        }

        return (
            <div className="login">
                <h1 className="login__heading">Welcome</h1>
                <Form onSubmit={this.handleSubmit}>
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
                        <Button type="dashed" htmlType="submit" className="domain__btn" loading={this.props.pending}>
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

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);