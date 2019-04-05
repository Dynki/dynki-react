import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { signUp } from '../../store/actions/authActions';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignUpForm extends React.Component {

    numberSuccess = 'red';
    mixedSuccess = 'red';
    specialSuccess = 'red';
    agreeFailed = false;
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!values.agree) {
                this.agreeFailed = true;
            } else {
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.props.signUp(values);
                }
            }

        });
    }

    validatePassword = (rule, value, callback) => {
        const password = value ? value : '';

        const hasNumber = value => {
            return new RegExp(/[0-9]/).test(value);
        }
        const hasMixed = value => {
            return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
        }
        const hasSpecial = value => {
            return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
        }

        this.specialSuccess = hasSpecial(password) ? '#52C41A' : 'red';
        this.mixedSuccess = hasMixed(password) ? '#52C41A' : 'red';
        this.numberSuccess = hasNumber(password) ? '#52C41A' : 'red';

        if (!password) {
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

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return (
            <div className="login">
                <h1 className="login__heading">Free Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
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
                            rules: [
                                { required: true, message: 'Please input a Password!' },
                                { validator: this.validatePassword }
                            ],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <div><Icon type="check" style={{ color: this.numberSuccess }}/> Contains a number</div>
                    <div><Icon type="check" style={{ color: this.mixedSuccess }}/> Contains upper case and lower case</div>
                    <div><Icon type="check" style={{ color: this.specialSuccess }}/> Contains a special character</div>
                    <FormItem>
                        {getFieldDecorator('agree', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: [
                                { required: true, message: 'Please agree terms!' },
                            ],
                        })(
                            <React.Fragment>
                                <Checkbox className={this.agreeFailed ? 'signup-agree--failed': ''}>{this.agreeFailed ? 'Please agree to' : 'I agree to the'}</Checkbox>
                                <a href="#">terms of service</a>
                                <span> and </span>
                                <a href="#">privacy policy</a>
                            </React.Fragment>
                        )}
                        <Button id="btnRegister" disabled={hasErrors(getFieldsError())} type="dashed" htmlType="submit" className="domain__btn" loading={this.props.pending}>
                            Go
                            <Icon type="check" />
                        </Button>
                        Or <Link to="/auth/login">back to login</Link>
                    </FormItem>
                </Form>

            </div>
        );
    }
}

export const SignUp = Form.create()(SignUpForm);

export const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);