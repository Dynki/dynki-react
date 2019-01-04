import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { debounce } from 'lodash';

import { checkDomain } from '../../store/actions/domainActions';

const FormItem = Form.Item;

class DomainForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            this.props.signIn(values);
        });
    }

    validateDomain = (rule, value, callback) => {
        let errStr = ''
        if (value.length > 0 && value.length < 4) {
            errStr = 'Too short, try a longer name!';
        }
        
        if (value.length > 50) {
            errStr = 'Too long, too long!';
        }

        const re = RegExp('^[0-9a-zA-Z \b]+$');
        if (value.length > 0 && !re.test(value)) {
            errStr = 'Sorry no wacky characters allowed!'
        }

        if (errStr !== '') {
            callback(errStr);
        } else {
            callback();
        }
    }

    onCheckDomain(name) {
        this.props.CheckDomain(name);
    }
      
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
                <h1 className="registration__heading">Name your team</h1>
                <h4>Give your team a name they can be proud of</h4>

                <Form className="new_domain__form" onSubmit={this.handleSubmit}>
                    <FormItem 
                        hasFeedback
                        validateStatus={this.props.validationStatus}
                        help={this.props.validatonFeedback}
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: "We're gonna need a team name" },
                                { validator: this.validateDomain }
                            ],
                        })(
                            <Input size="large" prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your team name" />
                        )}
                    </FormItem>
                    <Button type="dashed" htmlType="submit" className="domain__btn" loading={this.props.pending}>
                        Create Team
                        <Icon type="arrow-right" />
                    </Button>

                </Form>

            </div>
        );
    }
}

const Domain = Form.create({
    onValuesChange(props, values) {
        this.onCheckDomain(values.name);
    }

})(DomainForm);

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth,
      domain: state.auth.domainId
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        CheckDomain: (name) => dispatch(checkDomain(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domain);