import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from 'styled-components';
import Media from 'react-media';

import { signUp } from '../../store/actions/authActions';
import Terms from './Terms';
import Privacy from './Privacy';

const FormItem = Form.Item;

const StyledPicture = styles.img`
    display: block;
    background-image: url(/assets/img/dog-sm.jpg), none;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;  
    width: 100%;
    height: 600px;
`;

const Background = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #BDB9B8;
    background-image: linear-gradient(177deg, #bdb9b8 0%, #d8d7da 62%);
    padding: 26px;
    min-height: calc(100vh - 80px);
`;

const StyledContent = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 70%;

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 100%;
    }
`;

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

class SignUpForm extends React.Component {

    numberSuccess = 'red';
    mixedSuccess = 'red';
    specialSuccess = 'red';
    agreeFailed = false;
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!values.agree) {
                this.agreeFailed = true;
            } else {
                if (!err) {
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
            <Background>

                <StyledContent>
                    <StyledForm>

                        <h1 className="heading">Sign Up</h1>
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
                                    <Checkbox className={this.agreeFailed ? 'signup-agree--failed': ''}>{this.agreeFailed ? 'Please agree to ' : 'I agree to the '}
                                        <Terms/>
                                        <span> and </span>
                                        <Privacy/>
                                    </Checkbox>
                                )}
                                <Button id="btnRegister" disabled={hasErrors(getFieldsError())} type="dashed" htmlType="submit" className="button" loading={this.props.pending}>
                                    Go
                                    <Icon type="check" />
                                </Button>
                                Or <Link id="backToLogin" to="/auth/login">go to login</Link>
                            </FormItem>
                        </Form>
                    </StyledForm>
                    <Media queries={{
                        medium: "(min-width: 600px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                        }}>
                        {matches => (
                            <React.Fragment>
                                {matches.medium && <StyledPicture/>}
                                {matches.large && <StyledPicture/>}
                            </React.Fragment>
                        )}
                    </Media>
                </StyledContent>
            </Background>
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