import React from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { updateBoardTitle } from '../../../store/actions/boardActions';

const FormItem = Form.Item;

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
    </Form>)
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

    render() {
        return (
            <div>
                <BForm {...this.fields} onChange={this.handleFormChange} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateBoards: (id, title) => dispatch(updateBoardTitle(id, title))
    }
}

export default connect(null, mapDispatchToProps)(FolderForm);