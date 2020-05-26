import React from 'react';
import { Form, Input } from 'antd';
import styles from 'styled-components';

const StyledInput = styles(Input)`
    border: none;
    border-radius: 1px;
    margin-left: 3px;
    min-width: 123px;
    padding: 4px;
    width: 100%;

    &:focus {
        outline-width: 0px;
        border: dashed;
        border-width: 1px;
    }
    
    &:hover {
        border: dashed;
        border-width: 1px;
        cursor: pointer;
    }

    &:disabled{
        cursor: not-allowed!important;
    }
`;

const FormItem = Form.Item;

const BRHForm = Form.create({
    mapPropsToFields(props) {
        return {
          ['headerValue' + props.colIdx]: Form.createFormField({
            ...props.headerValue,
            value: props.headerValue.value,
          })
        };
    }

})((props) => {
    const { getFieldDecorator } = props.form;
    const id = 'headerValue' + props.colIdx;

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
                {getFieldDecorator(id, {})(
                    <StyledInput onBlur={() => handleBlur()}/>
                )}
            </FormItem>
        </Form>
    )
});

const BoardRowHeaderForm = (props) => {

    const handleFormChange = (changedFields) => {
        const updatedBoard = props.board;
        updatedBoard.columns[props.colIdx].title = changedFields['headerValue'+props.colIdx];
        props.onUpdateBoard(updatedBoard);
    }

    const fields = {
        headerValue: {
        value: props?.board?.columns?.[props.colIdx]?.title ? props.board.columns[props.colIdx].title : '',
        }
    };

    return (
        <BRHForm {...fields} colIdx={props.colIdx} onChange={handleFormChange} />
    );
}


export default BoardRowHeaderForm;