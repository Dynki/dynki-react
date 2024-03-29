import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import styles from 'styled-components';
import { Button, Icon, Modal, Typography } from 'antd';
import PaymentMethodForm from './PaymentMethodForm';

import { attachPaymentMethod, createSetupIntent, getSubscriptionDetails } from '../../../store/actions/subscriptionActions';

const { Title } = Typography;

const Heading = styles.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: flex-end;
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

const StyledModal = styles(Modal)`
    min-width: 800px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        min-width: 100%;
    }
`;

const PaymentMethodModal = ({ 
    attachPaymentMethod, 
    buttonText, 
    
    createPaymentIntent, 
    createSetupIntent, 
    getSubscriptionDetails,
    label, 
    nextPayment, 
    subscription,
    successText,
    title
}) => {
    label = label ? label : 'Make a payment';

    const [isVisible, setIsVisible] = useState(false);
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const addPaymentMethod = () => {
        setTriggerSubmit(true);
    }

    const onAttachPaymentMethod = async paymentMethodId => {
        try {
            await attachPaymentMethod(paymentMethodId);
            const response = await createSetupIntent(paymentMethodId);
            return response;
        } catch (error) {
            return error;
        }
    }

    const onSetVisible = status => {
        setIsVisible(status);
    }

    const onSetInProgress = status => {
        setInProgress(status);
    }

    return (
        <div>
            <Button icon="shopping" size="large" type="primary" onClick={() => setIsVisible(true)}>{label}</Button>
            <StyledModal
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                okText={buttonText}
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{
                    icon: "shopping",
                    size: "large",
                    loading: inProgress
                }}
                onOk={addPaymentMethod}
            >
                <div>
                    <Heading>
                        <ShopIcon type="shop" />
                        <Title level={2}>{title}</Title>
                    </Heading>
                    <SupportedPayments>
                        <PaymentType alt="Visa" src="./assets/pay/icons/1.png"/>
                        <PaymentType alt="MasterCard" src="./assets/pay/icons/2.png"/>
                    </SupportedPayments>
                    <StripeProvider apiKey="pk_live_JlKqMJTF3VfjAmxIQ2KG4VYc">
                        <Elements>
                            <PaymentMethodForm 
                                triggerSubmit={triggerSubmit}
                                resetSubmitTrigger={() => setTriggerSubmit(false)}
                                onAttachPaymentMethod={onAttachPaymentMethod}
                                onSetVisible={onSetVisible}
                                onSetInProgress={onSetInProgress}
                                nextPayment={nextPayment}
                                subscription={subscription}
                                createPaymentIntent={createPaymentIntent}
                                getSubscriptionDetails={getSubscriptionDetails}
                                successText={successText}
                            />
                        </Elements>
                    </StripeProvider>
                </div>
            </StyledModal>
            
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        attachPaymentMethod: paymentMethodId => dispatch(attachPaymentMethod(paymentMethodId)),        
        createSetupIntent: paymentMethodId => dispatch(createSetupIntent(paymentMethodId)),
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails())
    }
}

export default connect(null, mapDispatchToProps)(PaymentMethodModal);