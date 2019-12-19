import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from 'styled-components';

import { signUp } from '../../../store/actions/authActions';
import Terms from '../Terms';
import Privacy from '../Privacy';

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

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const SignUpForm = ({ form, pending, signUp }) => {

    let numberSuccess = 'red';
    let mixedSuccess = 'red';
    let specialSuccess = 'red';
    let agreeFailed = false;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!values.agree) {
                agreeFailed = true;
            } else {
                if (!err) {
                    signUp(values);
                }
            }

        });
    }

    const validatePassword = (rule, value, callback) => {
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

        specialSuccess = hasSpecial(password) ? '#52C41A' : 'red';
        mixedSuccess = hasMixed(password) ? '#52C41A' : 'red';
        numberSuccess = hasNumber(password) ? '#52C41A' : 'red';

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

    const { getFieldDecorator, getFieldsError } = form;

    return (
        <Fragment>
            <StyledForm>
                <h1 className="heading">Sign Up</h1>
                <Form onSubmit={handleSubmit}>
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
                                { validator: validatePassword }
                            ],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <div><Icon type="check" style={{ color: numberSuccess }}/> Contains a number</div>
                    <div><Icon type="check" style={{ color: mixedSuccess }}/> Contains upper case and lower case</div>
                    <div><Icon type="check" style={{ color: specialSuccess }}/> Contains a special character</div>
                    <FormItem>
                        {getFieldDecorator('agree', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: [
                                { required: true, message: 'Please agree terms!' },
                            ],
                        })(
                            <Checkbox className={agreeFailed ? 'signup-agree--failed': ''}>{agreeFailed ? 'Please agree to ' : 'I agree to the '}
                                <Terms/>
                                <span> and </span>
                                <Privacy/>
                            </Checkbox>
                        )}
                        <Button id="btnRegister" disabled={hasErrors(getFieldsError())} type="dashed" htmlType="submit" className="button" loading={pending}>
                            Go
                            <Icon type="check" />
                        </Button>
                        Or <Link id="backToLogin" to="/auth/login">go to login</Link>
                    </FormItem>
                </Form>
            </StyledForm>
        </Fragment>
    );
}

export const SignUp = Form.create()(SignUpForm);
export default SignUp;