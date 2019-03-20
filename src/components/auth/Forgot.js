import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

import { forgotPassword } from '../../store/actions/authActions';

const FormItem = Form.Item;

class ForgotForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.forgotPassword(values.email);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { auth } = this.props;

        if (auth.uid) {
            return <Redirect to='/' />
        }

        return (
            <div className="login">
                <h1 className="login__heading">Forgot your password?</h1>
                <h2>Don't worry I do it all the time</h2>
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
                    <Button style={{'margin-bottom': 10}} id="submitbtn" type="dashed" htmlType="submit" className="domain__btn" loading={this.props.pending}>
                        Send Email
                        <Icon type="enter"/>
                    </Button>
                    Or <Link id="backToLogin" to="/auth/login">back to login</Link>
                </Form>
            </div>
        );
    }
}

export const Forgot = Form.create()(ForgotForm);

export const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth,
      domain: state.domain.domainId
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (creds) => dispatch(forgotPassword(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);