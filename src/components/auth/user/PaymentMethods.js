import React from 'react';
import { Card, Dropdown, Icon, Menu, Popconfirm, Table, Tag } from 'antd';
import styles from 'styled-components';

import PaymentMethodModal from './PaymentMethodModal';

const StyledCard = styles(Card)`
    margin-top: 20px;
`;

const StyledIcon = styles(Icon)`
    margin-right: 15px;
`;



const PaymentMethods = ({ subscription, handleDelete, handleSetDefault }) => {

    console.log('PM Subscription data', subscription);

    const data = subscription && subscription.data ? subscription.data.paymentMethods : [];

    const menu = (record) => (
        <Menu>
          <Menu.Item>
                <Popconfirm placement="left" title="Remove really?" onConfirm={() => handleDelete(record.id)} okText="Yes remove">
                    <a className="ant-dropdown-link" href="#">
                        <StyledIcon type="delete"/> Remove
                    </a>
                </Popconfirm>
          </Menu.Item>
          {record && record.default !== 'Default' ? 
            <Menu.Item>
                    <a className="ant-dropdown-link" href="#" onClick={() => handleSetDefault(record.id)}>
                        <StyledIcon type="pushpin" /> Set Default
                    </a>
            </Menu.Item>
            :
            null
          }
        </Menu>
    );
    
    const columns = [
        {
          title: 'Brand',
          dataIndex: 'brand',
        },
        {
          title: 'Last 4 Digits',
          dataIndex: 'last4',
        },
        {
          title: 'Expiry Month',
          dataIndex: 'exp_month',
        },
        {
            title: 'Expiry Year',
            dataIndex: 'exp_year',
        },
        {
            title: 'Default',
            dataIndex: 'default',
            render: text => text === 'Default' ?  <Icon type="pushpin" theme="twoTone" /> : null
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            id: 'deletePm',
            key: 'id',
            render: (text, record) => (
                <Dropdown overlay={menu(record)}>
                    <a className="ant-dropdown-link" href="#">
                        <Icon type="dash" />
                    </a>
                </Dropdown>
            )
    
        },
    ];
    
    return (
        <StyledCard 
            title="Payment Methods"
            extra={<PaymentMethodModal label="Add payment method"/>}
        >
            <Table loading={subscription.loading} columns={columns} dataSource={data} size="small"/>
        </StyledCard>
    );
}

export default PaymentMethods;
