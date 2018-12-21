import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { updateBoard } from '../../store/actions/boardActions';
import { debounce } from 'lodash';

const FormItem = Form.Item;

const BForm = Form.create({
    mapPropsToFields(props) {
        return {
          title: Form.createFormField({
            ...props.title,
            value: props.title.value,
          }),
          description: Form.createFormField({
            ...props.description,
            value: props.description.value
          }),
        };
    },

    // onFieldsChange(props, changedFields) {
    //     props.onChange(changedFields);
    // },

    onValuesChange(props, values) {
        props.onChange(values);
    }
})((props) => {
    const { getFieldDecorator } = props.form;

    return (
        <div className="board__form">
            <Form>
                <FormItem>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input 
                        className="text__large--no-border board__form__description"
                        size="large" 
                        placeholder="Board title goes here" 
                        autoComplete="false" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <Input className="text--no-border description" placeholder="Add a board descripton" autoComplete="false"/>
                    )}
                </FormItem>
            </Form>
        </div>
    )
});

class BoardForm extends Component {

    constructor(props) {
        super(props)
        this.onUpdateBoard = debounce(this.onUpdateBoard, 500)
    }

    handleFormChange = (changedFields) => {
        const updatedBoard = { ...this.props.currentBoard, ...changedFields }
        this.onUpdateBoard(updatedBoard);
    }

    onUpdateBoard(board) {
        console.log('UPDATE Board with values::', board);
        this.props.updateBoard(board);
    }

    render() {
        const state = {
            fields: {
              title: {
                value: this.props.currentBoard ? this.props.currentBoard.title : '',
              },
              description: {
                  value: this.props.currentBoard ? this.props.currentBoard.description : ''
              }
            },
        };
        const fields = state.fields;
        return (
            <div>
            <BForm {...fields} onChange={this.handleFormChange} />
            <pre className="language-bash">
                {JSON.stringify(fields, null, 2)}
            </pre>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      currentBoard: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      updateBoard: (board) => dispatch(updateBoard(board)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardForm);