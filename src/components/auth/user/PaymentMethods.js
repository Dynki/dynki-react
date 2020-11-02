import React from 'react'
import Media from 'react-media'
import { DashOutlined, PushpinTwoTone } from '@ant-design/icons'
import { Card, Dropdown, Menu, Popconfirm, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styles from 'styled-components'

import PaymentMethodModal from './PaymentMethodModal'

const StyledCard = styles(Card)`
    margin-top: 20px;
`

const StyledIcon = styles(DeleteOutlined)`
    margin-right: 15px;
`

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
`

const PaymentMethods = ({ createPaymentIntent, subscription, handleDelete, handleSetDefault, reactivateAllowed }) => {
    const data = subscription && subscription.data ? subscription.data.paymentMethods : [];

    const menu = (record) => (
        <Menu>
          <Menu.Item>
                <Popconfirm placement="left" title="Remove really?" onConfirm={() => handleDelete(record.id)} okText="Yes remove">
                    <StyledLink className="ant-dropdown-link">
                        <StyledIcon type="delete"/> Remove
                    </StyledLink>
                </Popconfirm>
          </Menu.Item>
          {record && record.default !== 'Default' ? 
            <Menu.Item>
                    <StyledLink className="ant-dropdown-link" onClick={() => handleSetDefault(record.id)}>
                        <StyledIcon type="pushpin" /> Set Default
                    </StyledLink>
            </Menu.Item>
            :
            null
          }
        </Menu>
    )

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
            render: text => text === 'Default' ?  <PushpinTwoTone /> : null
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            id: 'deletePm',
            key: 'id',
            render: (text, record) => (
                <Dropdown overlay={menu(record)}>
                    <StyledLink className="ant-dropdown-link">
                        <DashOutlined />
                    </StyledLink>
                </Dropdown>
            )
    
        },
    ]
    
    return (
        <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
            }}>
            {matches => (
                <StyledCard 
                    title={matches.small ? "" : "Payment Methods"}
                    extra={reactivateAllowed ? null : <PaymentMethodModal
                        createPaymentIntent={createPaymentIntent} 
                        subscription={subscription.data} 
                        buttonText="Add Payment Method" 
                        label="Add payment method" 
                        title="Add Payment Method for Business Plan"
                        successText="Your payment method was successfully attached"
                    />}
                >
                    <Table
                        scroll={{ x: true }} 
                        rowKey="id" 
                        loading={subscription.loading} 
                        columns={columns} 
                        dataSource={data} 
                        size="small"
                    />
                </StyledCard>
            )}
        </Media>
    )
}

export default PaymentMethods
