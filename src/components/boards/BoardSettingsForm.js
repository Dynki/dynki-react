import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select } from 'antd';

import { updateBoardRoles } from '../../store/actions/boardActions';

const { Option } = Select;

class BoardSettingsForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.updateBoardRoles(this.props.board.id, values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { progress, team } = this.props;

        const handleBlur = () => {
            this.handleSubmit();
        }

        const selectChildren = [];

        team.groups.map(v => {
            selectChildren.push(<Option key={v.id}>{v.name}</Option>);
            return v;
        });

        return (
            <div className="boardSettings">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Read permissions"
                    >
                        {getFieldDecorator('read', {
                            rules: [],
                        })(
                            <Select 
                            mode="tags"
                            disabled={progress}
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            onBlur={() => handleBlur()}
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
                            disabled={progress}
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            onBlur={() => handleBlur()}
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
                            disabled={progress}
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            ref={node => (this.input = node)} 
                            onBlur={() => handleBlur()}
                            >{selectChildren}</Select>
                        )}
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

const WrappedBoardSettingsForm = Form.create({ 
    name: 'boardSettings',
    mapPropsToFields(props) {
        return {
          read: Form.createFormField({
            ...props.board.roles.read,
            value: props.board.roles.read,
          }),
          write: Form.createFormField({
            ...props.board.roles.write,
            value: props.board.roles.write,
          }),
          delete: Form.createFormField({
            ...props.board.roles.delete,
            value: props.board.roles.delete,
          })
        };
    }
})(BoardSettingsForm);

export const mapStateToProps = (state) => {
    return{
      user: state.auth.currentUser,
      board: state.boards.currentBoard,
      team: state.teams.currentTeam,
      progress: state.base.progress
    }
  }

export const mapDispatchToProps = (dispatch) => {
    return {
        updateBoardRoles: (boardId, roles) => dispatch(updateBoardRoles(boardId, roles))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedBoardSettingsForm);
