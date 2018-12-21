import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class BForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="board__form">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('boardtitle', {
                            rules: [],
                        })(
                            <Input className="text__large--no-border board__form__description" size="large" placeholder="Board Title" autoComplete="false" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <Input className="text--no-border description" placeholder="Descripton" autoComplete="false"/>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const BoardForm = Form.create()(BForm);

const mapStateToProps = (state) => {
    return{
      currentBoard: state.boards.currentBoard
    }
  }
  
// const mapDispatchToProps = (dispatch) => {
//     return {
//         signIn: (creds) => dispatch(signIn(creds))
//     }
// }

export default connect(mapStateToProps)(BoardForm);