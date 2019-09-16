import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Members',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Member Of',
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
  },
];

const data = [
  {
    key: '1',
    name: 'Dean',
    tags: ['Administrators', 'Users'],
  },
  {
    key: '2',
    name: 'Jake',
    tags: ['Administrators'],
  },
];

const TeamMembers = (props) => {
    return (<Table columns={columns} dataSource={data} />);
}

export default TeamMembers;