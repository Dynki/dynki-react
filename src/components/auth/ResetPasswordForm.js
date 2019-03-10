import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Alert
} from 'antd';

import { changePassword } from '../../store/actions/authActions';


class ResetPasswordForm extends React.Component {
    state = {
        confirmDirty: false,
        passwordValidity: undefined,
        passwordValidityError: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.changePassword(values.password, values.newpassword);
            }
        });
    }

    onChange = (props, values) => {
        const password = values.password;

        const hasNumber = value => {
            return new RegExp(/[0-9]/).test(value);
        }
        const hasMixed = value => {
            return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
        }
        const hasSpecial = value => {
            return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
        }

        if (hasNumber(password) && hasMixed(password) && hasSpecial(password)) {
            this.setState({ passwordValidity: 'success', passwordValidityError: '' });
        } else if (!hasNumber(password)) {
            this.setState({ passwordValidity: 'fail', passwordValidityError: 'Must contain a number' });

        } else if (!hasMixed(password)) {
            this.setState({ passwordValidity: 'fail', passwordValidityError: 'Must contain upper and lower case letters' });

        } else if (!hasSpecial(password)) {
            this.setState({ passwordValidity: 'fail', passwordValidityError: 'Must contain at least one special character' });
        }
    } 

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newpassword')) {
          callback("Doh! Passwords don't match!!");
        } else {
          callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                label="Current password"
                >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please enter your current password!',
                    }, {
                    validator: this.validateToNextPassword,
                    }],
                })(
                    <Input 
                        type="password"
                        placeholder="Current password"
                    />
                )}
                </Form.Item>
                <React.Fragment>
                    <Alert
                        message="Password Policy"
                        description="Passwords must contain"
                        type="info"
                        showIcon
                    />
                    <Alert message="At least one number" type="info" showIcon />
                    <Alert message="One upper and lower case letter" type="info" showIcon />
                    <Alert message="One special character" type="info" showIcon />
                </React.Fragment>
                <Form.Item
                label="New password"
                >
                {getFieldDecorator('newpassword', {
                    rules: [
                        { pattern: /[0-9]/, message: 'Must contain a number' },
                        { pattern: /[a-z]/, message: 'Must contain a lower case letter' },
                        { pattern: /[A-Z]/, message: 'Must contain an upper case letter' },
                        { pattern: /[!#@$%^&*)(+=._-]/, message: 'Must contain a special character' },
                        { required: true, message: 'Please input your new password!' },
                        { validator: this.validateToNextPassword }
                    ],
                })(
                    <Input 
                        type="password"
                        placeholder="New password"
                    />
                )}
                </Form.Item>
                <Form.Item
                label="Confirm new password"
                >
                {getFieldDecorator('confirm', {
                    rules: [{
                    required: true, message: 'Please confirm your password!',
                    }, {
                    validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input 
                        placeholder="Confirm new password"
                        type="password" 
                        onBlur={this.handleConfirmBlur} 
                    />
                )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Change Password</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedResetPasswordForm = Form.create({ 
    name: 'resetPassword',
    mapPropsToFields(props) {
        return {
          email: Form.createFormField({
            ...props.currentUser.email,
            value: props.currentUser.email,
          }),
          displayName: Form.createFormField({
            ...props.currentUser.displayName,
            value: props.currentUser.displayName,
          }),
        };
    },
    onValuesChange(props, values) {
        // props.onChange(props, values);
    }
})(ResetPasswordForm);

export const mapStateToProps = (state) => {
    return{
      currentUser: state.auth.currentUser
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (updatedValues) => dispatch(changePassword(updatedValues))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedResetPasswordForm);
