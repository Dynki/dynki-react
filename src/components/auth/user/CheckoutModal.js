import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import styles from 'styled-components';
import { ShoppingOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import CheckoutForm from './CheckoutForm';

const { Text, Title } = Typography;

const Heading = styles.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: flex-end;
`;

const StyledText = styles(Text)`
    margin-bottom: 17px;
    font-size: 20px;
    margin-left: 10px;
`;

const SupportedPayments = styles.div`
    display: flex;
    flex-direction: row;
`;

const PaymentType = styles.img`
    height: 48px;
    margin-right: 5px;
`;

const ShopIcon = styles(Icon)`
    font-size: 33px;
    padding-bottom: 20px;
    margin-right: 20px;

    svg {
        color: #3095DE;
    }
`;

const CheckoutModal = ({ label, teamName }) => {
    label = label ? label : 'Make a payment';

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <Button icon={<ShoppingOutlined />} size="large" type="primary" onClick={() => setIsVisible(true)}>{label}</Button>
            <Modal
                style={{ minWidth: '800px' }}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                okText="Submit Purchase"
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{
                    icon: "shopping",
                    size: "large"
                }}
            >
                <div>
                    <Heading>
                        <ShopIcon type="shop" />
                        <Title level={2}>Purchase Business Plan</Title>
                        <StyledText strong>for {teamName}</StyledText>
                    </Heading>
                    <SupportedPayments>
                        <PaymentType alt="Visa" src="./assets/pay/icons/1.png"/>
                        <PaymentType alt="MasterCard" src="./assets/pay/icons/2.png"/>
                    </SupportedPayments>
                    <StripeProvider apiKey="pk_live_JlKqMJTF3VfjAmxIQ2KG4VYc">
                        <Elements>
                            <CheckoutForm/>
                        </Elements>
                    </StripeProvider>
                </div>
            </Modal>
            
        </div>
    );
}

export default CheckoutModal;