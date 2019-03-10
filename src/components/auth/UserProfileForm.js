import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Icon
} from 'antd';

import { updateUserProfile } from '../../store/actions/authActions';

class UserProfileForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.updateUserProfile(values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Email"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input 
                            placeholder="Enter your email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label="Display Name"
                >
                    {getFieldDecorator('displayName', {
                    })(
                        <Input 
                            placeholder="Give yourself a name to be proud of"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedUserProfileForm = Form.create({ 
    name: 'userProfile',
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
    }
})(UserProfileForm);

export const mapStateToProps = (state) => {
    return{
      currentUser: state.auth.currentUser
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: (updatedValues) => dispatch(updateUserProfile(updatedValues))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserProfileForm);
