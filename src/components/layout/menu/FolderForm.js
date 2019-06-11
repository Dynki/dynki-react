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
        <FormItem>
            {getFieldDecorator('title', {
                rules: [],
            })(
                <Input 
                    placeholder="Folder name goes here" 
                    autoComplete="no way" 
                    // onBlur={() => handleBlur()}
                />
            )}
        </FormItem>
    </Form>)
});

class FolderForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: '' }
        this.fields = { title: '' }
    }

    handleFormChange = (changedFields) => {
        if (changedFields.title !== this.state.title) {
            // this.setState({ title: changedFields.title});
            // this.props.onUpdateBoards(this.props.folder.id, changedFields.title);
        }
    }

    componentWillReceiveProps() {
        this.fields = {
            title: {
                value: this.state.title ? this.state.title : '',
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