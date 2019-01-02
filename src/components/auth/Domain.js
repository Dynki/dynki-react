import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';


// import { CheckDomain } from '../../store/actions/authActions';

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

    render() {

        console.log('Domain::Render');

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
                <h1 class="registration__heading">Name your team</h1>
                <h4>Give your team a name they can be proud of</h4>

                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: 'Please input an email!' },
                                {  }
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

const Domain = Form.create()(DomainForm);

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      pending: state.auth.pending,
      auth: state.firebase.auth,
      domain: state.auth.domain
    }
  }
  
// const mapDispatchToProps = (dispatch) => {
//     return {
//         CheckDomain: (name) => dispatch(CheckDomain(name))
//     }
// }

export default connect(mapStateToProps)(Domain);