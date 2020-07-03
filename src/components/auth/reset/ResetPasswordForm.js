import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Card, Form, Input } from 'antd';
import styles from 'styled-components';

import { changePassword } from '../../../store/actions/authActions';

const StyledForm = styles(Form)`
    display: flex;
    flex-direction: column;
    width: 500px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 100%;
    }
`;

class ResetPasswordForm extends React.Component {
    state = {
        confirmDirty: false,
        passwordValidity: undefined,
        passwordValidityError: '',
    };

    specialSuccess = 'info';
    numberSuccess = 'info';
    mixedSuccess = 'info';

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.changePassword(values.password, values.newpassword);
            }
        });
    }

    validatePassword = (rule, value, callback) => {
        const password = value;

        

        const hasNumber = value => {
            return new RegExp(/[0-9]/).test(value);
        }
        const hasMixed = value => {
            return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
        }
        const hasSpecial = value => {
            return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
        }

        this.specialSuccess = hasSpecial(password) ? 'success' : 'info';
        this.mixedSuccess = hasMixed(password) ? 'success' : 'info';
        this.numberSuccess = hasNumber(password) ? 'success' : 'info';

        if (!password || password.length === 0) {
            callback();
        } else if (password.length > 0 && password.length < 8) {
            callback('Must be longer than 8 characters');
        } else if (hasNumber(password) && hasMixed(password) && hasSpecial(password)) {
            callback();
        } else if (!hasNumber(password)) {
            callback('Must contain a number');

        } else if (!hasMixed(password)) {
            callback('Must contain upper and lower case letters');

        } else if (!hasSpecial(password)) {
            callback('Must contain at least one special character');
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
        const { form } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Card 
                title="Change Password"
                actions={[
                    <Button type="primary" size="large" icon="save" onClick={this.handleSubmit}>Change Password</Button>
                ]}
            >
            <StyledForm onSubmit={this.handleSubmit}>
                <Form.Item
                label="Current password"
                >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please enter your current password!',
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
                    <Alert message="At least one number" type={this.numberSuccess} showIcon />
                    <Alert message="One upper and lower case letter" type={this.mixedSuccess} showIcon />
                    <Alert message="One special character" type={this.specialSuccess} showIcon />
                </React.Fragment>
                <Form.Item
                label="New password"
                >
                {getFieldDecorator('newpassword', {
                    rules: [
                        { required: true, message: 'Please input your new password!' },
                        { validator: this.validateToNextPassword },
                        { validator: this.validatePassword }
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
            </StyledForm>
            </Card>
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
        changePassword: (password, newpassword) => dispatch(changePassword(password, newpassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedResetPasswordForm);
