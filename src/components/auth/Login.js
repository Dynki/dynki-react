import React, { Component } from 'react';
import Media from 'react-media';
import styles from 'styled-components';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { signIn } from '../../store/actions/authActions';

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
        font-family: Raleway;
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

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signIn(values);
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
            <Background>
                <StyledContent>
                    <StyledForm>
                        <h1 className="heading">Welcome</h1>
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
                                    rules: [
                                        { required: true, message: 'Please input your Password!' }
                                    ],
                                })(
                                    <Input id="password" size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <Link id="forgotPassword" className="login-form-forgot" to='/auth/forgot'>Forgot password</Link>
                                <Button id="loginbtn" type="dashed" htmlType="submit" className="button" loading={this.props.pending}>
                                    Log In
                                    <Icon type="enter" />
                                </Button>
                                Or <Link id="register" to="/auth/signup">register now!</Link>
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

export const Login = Form.create()(LoginForm);

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
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);