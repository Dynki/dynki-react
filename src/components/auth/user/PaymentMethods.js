import React from 'react';
import { Card, Form, Button, Icon, Popconfirm, Row, Col, Statistic, Skeleton } from 'antd';
import styles from 'styled-components';

import PaymentMethodModal from './PaymentMethodModal';

const StyledCard = styles(Card)`
    margin-top: 20px;
`;

const PaymentMethods = props => {
    return (
        <StyledCard 
            title="Payment Methods"
            extra={<PaymentMethodModal label="Add payment method"/>}
        >

        </StyledCard>
    );
}


export default PaymentMethods;
