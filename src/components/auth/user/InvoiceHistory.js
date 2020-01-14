import React from 'react';
import { Card, Table } from 'antd';
import styles from 'styled-components';

const StyledCard = styles(Card)`
    margin-top: 20px;
`;

const columns = [
    {
        title: 'Invoice Date',
        dataIndex: 'created',
        render: (text) => new Date(text * 1000).toDateString()
      },
    {
      title: 'Billing Reason',
      dataIndex: 'billing_reason',
    },
    {
      title: 'Amount Due',
      dataIndex: 'amount_due',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Next Payment Attempt',
      dataIndex: 'next_payment_attempt',
      render: (text) => new Date(text * 1000).toDateString()
    },
    {
        title: 'Status',
        dataIndex: 'status'
    }
];

const InvoiceHistory = ({ subscription }) => {

    const data = subscription && subscription.data ? subscription.data.invoices : [];

    return (
        <StyledCard 
            title="Invoices"
        >
            <Table columns={columns} dataSource={data} size="small"/>
        </StyledCard>
    );
}


export default InvoiceHistory;
