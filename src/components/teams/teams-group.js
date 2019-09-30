import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Team Groups',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
];

const TeamGroups = (props) => {
    return (<Table columns={columns} dataSource={props.groups}  />);
}

export default TeamGroups;