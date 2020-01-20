import React, { useState } from 'react';
import { Button, Form, Input, Icon, Select, Popconfirm, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

const { Option } = Select;
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
        const { values, children, dataIndex, record, title } = this.props;
        const { editing } = this.state;

        const selectChildren = [];

        values.map(v => {
          selectChildren.push(<Option key={v.id}>{v.name}</Option>);
        })

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
        )
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

    const { hasRole } = props;

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

    const handleSave = row => {
      props.handleSave(row);
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
                        const group = props.groups.find(g => g.id === tag);
                        const name = group ? group.name : '';
                        return (
                            <Tag color={color} key={tag}>
                                {name}
                            </Tag>
                        );
                    })}
                </span>
            ),
            filters: props.groups.map(g => ({ text: g.name, value: g.id })),
            filterMultiple: true,
            onFilter: (value, record) => record.tags.includes(value),
            editable: hasRole('ADMINISTRATORS'),
            onCell: record => ({
                record,
                editable: hasRole('ADMINISTRATORS'),
                dataIndex: 'memberOf',
                title: 'Members of Groups',
                values: props.groups,
                handleSave: handleSave.bind(this)
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
        {
          title: 'Action',
          dataIndex: 'id',
          id: 'deleteMember',
          key: 'id',
          width: 84,
          align: 'center',
          render: (text, record) =>
            ['ADMINISTRATORS', 'BOARD_USERS', 'BOARD_CREATORS'].indexOf(record.name) < 0 && hasRole('ADMINISTRATORS') ? (
              <Popconfirm placement="left" title="Delete really?" onConfirm={() => handleDelete(record.id)} okText="Yes delete member">
                  <Icon data-testid={`delete-group-${record.email}`} type="delete" style={{'color': 'red'}}/>
              </Popconfirm>
            ) : null,
        },

    ];


    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
      };

    const handleDelete = (id) => {
      props.handleDelete(id);
    }
  
    return (
    <React.Fragment>
        <EditableContext.Provider value={props.form}>
          <Table 
              className="member-table"
              rowKey={record => record.id}
              footer={() => <div>
              <Button disabled={!hasRole('ADMINISTRATORS')} key="1fdfdfd" type="default" onClick={() => props.setDrawerVisibility(true)}>
                  Invite a team member
              </Button>
              </div>}
              rowClassName={() => 'editable-row'}
              components={components} columns={columns} dataSource={props.members} 
              handleDelete={handleDelete}
              handleSave={props.handleSave}
              loading={props.loading}
          />
        </EditableContext.Provider>
    </React.Fragment>)
}

export default Form.create()(TeamMembers);