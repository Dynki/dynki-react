import React from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { Card, Table, Typography, Tooltip } from 'antd';
import styles from 'styled-components';

const { Text } = Typography;

const StyledCard = styles(Card)`
    margin-top: 20px;
`;

const StyledFooter = styles(Text)`
  color: #3095DE;
  margin: 10px;
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
    },
    {
      title: 'View',
      dataIndex: 'hosted_invoice_url',
      render: (text) => {
        return (
          <Tooltip
            title="View Invoice"
            placement="left"            
          >
            <a href={text} target="blank"><FilePdfOutlined /></a>
          </Tooltip>
        );
      }
    }
];

const InvoiceHistory = ({ subscription }) => {

    const data = subscription && subscription.data ? subscription.data.invoices : [];
    const showNextInvoiceDate = subscription.data.next_invoice_due;

    const nextInvoice = (
      showNextInvoiceDate ? 
        <StyledFooter strong>
          {`Next invoice due: ${new Date(subscription.data.next_invoice_due * 1000).toDateString()}`}
        </StyledFooter>
        :
        null
    );

    return (
        <StyledCard 
            title="Invoices"
        >
            <Table
              columns={columns}
              rowKey="id"
              scroll={{ x: true }} 
              dataSource={data} size="small"
              footer={() => nextInvoice}
            />
        </StyledCard>
    );
}


export default InvoiceHistory;
