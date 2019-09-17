import React, { useState } from 'react';
import { Button, Input, Icon, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

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
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Member of Groups',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
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

    const data = [
        {
            key: '1',
            name: 'DeanSelvey@gmail.com',
            tags: ['Administrators', 'Users'],
            status: 'Active'
        },
        {
            key: '2',
            name: 'Jake@gmail.com',
            tags: ['Administrators'],
            status: 'Active'
        },
    ];

    return (<Table columns={columns} dataSource={data} />);
}

export default TeamMembers;