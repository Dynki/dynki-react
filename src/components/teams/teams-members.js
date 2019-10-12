import React, { useState } from 'react';
import { Button, Form, Input, Icon, Table, Tag, Select } from 'antd';
import Highlighter from 'react-highlight-words';

const { Option } = Select;
const EditableContext = React.createContext();

const selectChildren = [];
selectChildren.push(<Option key={'Administrators'}>{'Administrators'}</Option>);
selectChildren.push(<Option key={'Users'}>{'Users'}</Option>);

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
            })(<Select 
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                ref={node => (this.input = node)} 
                onPressEnter={this.save} 
                onBlur={this.save} 
                >{selectChildren}</Select>)}
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
  

const TeamMembers = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchInput, setSearchInput] = useState(null);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        setSearchInput(node);
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                 autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };


    const columns = [
        {
            title: 'Team Member',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Member of Groups',
            key: 'memberOf',
            dataIndex: 'memberOf',
            render: groups => (
                <span>
                    {groups.map(tag => {
                        let color = 'geekblue';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
            filters: [
                {
                    text: 'Administrators',
                    value: 'Administrators',
                },
                {
                    text: 'Users',
                    value: 'Users',
                },
            ],
            filterMultiple: true,
            onFilter: (value, record) => record.tags.includes(value),
            editable: true,
            onCell: record => ({
                record,
                editable: true ,
                dataIndex: 'memberOf',
                title: 'Members of Groups'
              }),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Active',
                    value: 'Active',
                },
                {
                    text: 'Disabled',
                    value: 'Disabled',
                },
                {
                    text: 'Pending',
                    value: 'Pending',
                },
            ],
            filterMultiple: true,
            onFilter: (value, record) => record.tags.includes(value),

        },
    ];


    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
      };

    return (
        <EditableContext.Provider value={props.form}>
            <Table components={components} columns={columns} dataSource={props.members} />
        </EditableContext.Provider>);
}

export default Form.create()(TeamMembers);