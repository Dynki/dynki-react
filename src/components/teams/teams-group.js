import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Input, Button, Popconfirm } from 'antd';
import styles from 'styled-components';

const StyledLink = styles.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
    }
`;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
      editing: false,
  };

  toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
  };

  save = e => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        values.name = values.groupNameInput;
        handleSave({ ...record, ...values });
      });
  };

  getInput = () => {
    return  <Input />
  };

  renderCell = form => {
      this.form = form;
      const { children, dataIndex, record, title } = this.props;
      const { editing } = this.state;
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator('groupNameInput', {
            rules: [
              {
                required: true,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
          ) : (
            children
          )}
        </td>
      );
  }
}

const components = {
  body: {
      row: EditableFormRow,
      cell: EditableCell,
  },
};


class TeamGroups extends React.Component { 

    constructor(props) {
      super(props);

      const { hasRole } = props;

      this.columns = [
        {
          title: 'Team Groups',
          dataIndex: 'name',
          key: 'name',
          render: text => <StyledLink data-testid={`group-${text.replace(' ', '-')}`}>{text}</StyledLink>,
          editable: true,
          onCell: record => ({
              record,
              editable: ['ADMINISTRATORS', 'BOARD_USERS', 'BOARD_CREATORS'].indexOf(record.name) < 0 && hasRole('ADMINISTRATORS'),
              dataIndex: 'name',
              title: 'name',
              handleSave: this.handleSave.bind(this),
            }),
      
        },
        {
          title: 'Action',
          dataIndex: 'id',
          id: 'deleteGroup',
          key: 'id',
          width: 84,
          align: 'center',
          render: (text, record) =>
            ['ADMINISTRATORS', 'BOARD_USERS', 'BOARD_CREATORS'].indexOf(record.name) < 0 && hasRole('ADMINISTRATORS') ? (
              <Popconfirm title="Delete really?" onConfirm={() => this.handleDelete(record.id)} okText="Yes delete group">
                  <DeleteOutlined
                    data-testid={`delete-group-${record.name.replace(' ', '-')}`}
                    style={{'color': 'red'}} />
              </Popconfirm>
            ) : null,
        },
      ];
    }

    handleDelete = (id) => {
      this.props.handleDelete(id);
    }

    handleSave = row => {
      this.props.handleSave(row);
    };

    render() {

      const { addGroup, groups, handleDelete, handleSave, hasRole } = this.props;

      return (groups ? <Table
        footer={() => <div><Button disabled={!hasRole('ADMINISTRATORS')} data-testid="addGroup" onClick={addGroup} key="3qdsdsds" type="default">Add a group</Button></div>}
        components={components} 
        columns={this.columns} 
        id="groups"
        scroll={{ x: true }}
        dataSource={groups}
        handleDelete={handleDelete}
        handleSave={handleSave}
        rowKey={record => record.id}
        rowClassName={() => 'editable-row'}
        />: null)
    }
}

export default TeamGroups;