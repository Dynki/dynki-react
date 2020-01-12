import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import styles from 'styled-components';
import { Button, Icon, Modal, Typography } from 'antd';
import PaymentMethodForm from './PaymentMethodForm';

import { attachPaymentMethod } from '../../../store/actions/subscriptionActions';

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

const PaymentMethodModal = ({ attachPaymentMethod, label }) => {
    label = label ? label : 'Make a payment';

    const [isVisible, setIsVisible] = useState(false);
    const [triggerSubmit, setTriggerSubmit] = useState(false);

    const addPaymentMethod = () => {
        setTriggerSubmit(true);
    }

    const onAttachPaymentMethod = paymentMethodId => {
        attachPaymentMethod(paymentMethodId);
    }

    return (
        <div>
            <Button icon="shopping" size="large" type="primary" onClick={() => setIsVisible(true)}>{label}</Button>
            <Modal
                style={{ minWidth: '800px' }}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                okText="Add Payment Method"
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{
                    icon: "shopping",
                    size: "large"
                }}
                onOk={addPaymentMethod}
            >
                <div>
                    <Heading>
                        <ShopIcon type="shop" />
                        <Title level={2}>Add Payment Method for Business Plan</Title>
                    </Heading>
                    <SupportedPayments>
                        <PaymentType alt="Visa" src="./assets/pay/icons/1.png"/>
                        <PaymentType alt="MasterCard" src="./assets/pay/icons/2.png"/>
                    </SupportedPayments>
                    <StripeProvider apiKey="pk_test_0HSo1Ghogz1ii6PLLIetNHMU">
                        <Elements>
                            <PaymentMethodForm 
                                triggerSubmit={triggerSubmit}
                                resetSubmitTrigger={() => setTriggerSubmit(false)}
                                onAttachPaymentMethod={onAttachPaymentMethod}
                            />
                        </Elements>
                    </StripeProvider>
                </div>
            </Modal>
            
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        attachPaymentMethod: paymentMethodId => dispatch(attachPaymentMethod(paymentMethodId))        
    }
}

export default connect(null, mapDispatchToProps)(PaymentMethodModal);