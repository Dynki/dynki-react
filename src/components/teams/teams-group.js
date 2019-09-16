import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Groups',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
];

const data = [
  {
    key: '1',
    name: 'Administrators',
  },
  {
    key: '2',
    name: 'Users',
  },
];

const TeamGroups = (props) => {
    return (<Table columns={columns} dataSource={data}  />);
}

export default TeamGroups;