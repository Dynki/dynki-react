import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input, Popconfirm } from 'antd';
import { updateBoardTitle, removeFolder } from '../../../store/actions/boardActions';

const BForm = Form.create({
    mapPropsToFields(props) {
        return {
          title: Form.createFormField({
            ...props.title,
            value: props.title.value,
          })
        };
    },
})((props) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
            }
            props.onChange(values);
        });
    }

    const handleBlur = () => {
        handleSubmit();
    }

    return (
    <React.Fragment>
        <Form autoComplete="off">
            <Form.Item
                label="Folder name"
            >
                {getFieldDecorator('title', {
                    rules: [],
                })(
                    <Input 
                        placeholder="Folder name goes here" 
                        autoComplete="no way" 
                        onBlur={() => handleBlur()}
                    />
                )}
            </Form.Item>
        </Form>
        <Popconfirm 
            className="userprofile__removeac-btn"
            title="Are you sure？There is no going back once you confirm!" 
            okText="Yes Remove This Folder!"
            okType="danger"
            cancelText="No keep my folder"
            onConfirm={props.deleteFolder}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        >
            <Button id="btnRemoveAccount" className="userprofile__deleteac-btn" type="danger" htmlType="submit">Remove this folder</Button>
        </Popconfirm>
    </React.Fragment>)
});

class FolderForm extends React.Component {

    handleFormChange = (changedFields) => {
        if (changedFields.title !== this.props.folder.title) {
            this.props.folder.title = changedFields.title;
            this.props.onUpdateBoards(this.props.folder.id, changedFields.title);
        }
    }

    fields = {
        title: {
            value: this.props.folder ? this.props.folder.title : '',
        }
    };

    componentWillReceiveProps(nextProps) {
        this.fields = {
            title: {
                value: nextProps.folder ? nextProps.folder.title : '',
            }
        };
    } 

    deleteFolder = () => {
        this.props.removeFolder(this.props.folder.id);
        this.props.onRemoveFolder();
    }

    render() {
        return (
            <div>
                <BForm {...this.fields} deleteFolder={this.deleteFolder} onChange={this.handleFormChange} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateBoards: (id, title) => dispatch(updateBoardTitle(id, title)),
        removeFolder: (id) => dispatch(removeFolder(id))
    }
}

export default connect(null, mapDispatchToProps)(FolderForm);