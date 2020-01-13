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
      title: 'Date Due',
      dataIndex: 'date_due',
    },
    {
        title: 'Paid',
        dataIndex: 'paid',
        render: (text) => text ? 'Yes' : 'No'
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
