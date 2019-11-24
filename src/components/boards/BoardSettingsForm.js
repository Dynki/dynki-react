import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Select, Icon
} from 'antd';

const { Option } = Select;

class UserProfileForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         this.props.updateUserProfile(values);
        //     }
        // });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { team } = this.props;

        const selectChildren = [];

        team.groups.map(v => {
            selectChildren.push(<Option key={v.id}>{v.name}</Option>);
        });

        return (
            <div className="userprofile">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Read permissions"
                    >
                        {getFieldDecorator('read', {
                            rules: [],
                        })(
                            <Select 
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            >{selectChildren}</Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Write permissions"
                    >
                        {getFieldDecorator('write', {
                            rules: [],
                        })(
                            <Select 
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            >{selectChildren}</Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Delete permissions"
                    >
                        {getFieldDecorator('delete', {
                            rules: [],
                        })(
                            <Select 
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            >{selectChildren}</Select>
                        )}
                    </Form.Item>

                </Form>
            </div>
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
      currentUser: state.auth.currentUser,
      team: state.teams.currentTeam
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserProfileForm);
