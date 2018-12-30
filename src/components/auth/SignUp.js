import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { signUp } from '../../store/actions/authActions';

const FormItem = Form.Item;

class SignUpForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            this.props.signUp(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                            rules: [{ required: true, message: 'Please input a Password!' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('agree', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Agree Terms</Checkbox>
                        )}
                        <Button type="dashed" htmlType="submit" className="domain__btn" loading={this.props.pending}>
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

const SignUp = Form.create()(SignUpForm);

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);