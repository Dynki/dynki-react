import React from 'react';
import { Table, Form, Input, Button, Popconfirm, Icon } from 'antd';

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
          {form.getFieldDecorator(dataIndex, {
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

      this.columns = [
        {
          title: 'Team Groups',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
          editable: true,
          onCell: record => ({
              record,
              editable: ['Administrators', 'Users'].indexOf(record.name) < 0,
              dataIndex: 'name',
              title: 'name',
              handleSave: this.handleSave.bind(this),
            }),
      
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'id',
          width: 24,
          align: 'center',
          render: (text, record) =>
            ['Administrators', 'Users'].indexOf(record.name) < 0 ? (
              <Popconfirm title="Delete really?" onConfirm={() => this.handleDelete(record.id)}>
                  <Icon type="delete" style={{'color': 'red'}}/>
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
      console.log(this.props.groups, 'props.groups');

      return (this.props.groups ? <Table
        footer={() => <div><Button onClick={this.props.addGroup} key="3qdsdsds" type="ghost">Add a group</Button>,</div>}
        components={components} 
        columns={this.columns} 
        dataSource={this.props.groups}
        handleDelete={this.props.handleDelete}
        handleSave={this.props.handleSave}
        rowKey={record => record.id}
        rowClassName={() => 'editable-row'}
        />: null);
    }
}

export default TeamGroups;