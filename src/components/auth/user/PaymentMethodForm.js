import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Card, Input, Typography, notification } from 'antd';
import styles from 'styled-components';


const { Text, Title } = Typography;

const StyledCardElement = styles.div`
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 40px;
    padding: 10px;
    width: 100%;

    :hover {
        border-color: #40a9ff;
    }

    :focus {
        border-color: #40a9ff;
    }
`;

const StyledForm = styles.form`
    margin-top: 7px;
`;

const StyledInput = styles(Input)`
    margin-bottom: 5px;
`;

const Label = styles(Text)`
    margin-left: 5px;
    margin-top: 7px;
    display: block;

    font-weight: bold;
`;

const CardLabel = styles(Text)`
    margin-left: 5px;
    margin-top: 5px;
    display: block;

    font-weight: bold;
`;

const FormItem = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormGroup = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormColumn = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormRow = styles.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Totals = styles(FormColumn)`
    align-items: flex-start;
    justify-content: flex-start;

    margin: 10px;
    margin-top: 27px;
    margin-left: 26px;
`;

const TotalsDesc = styles(FormGroup)`
    align-items: flex-start;
    justify-content: flex-start;

    margin: 10px;
`;

const TotalsNumbers = styles(FormGroup)`
    margin: 10px;
    width: auto;
`;

const TotalsRow = styles(FormRow)`
    align-items: flex-end;
    justify-content: flex-end;
`;

const TotalLabel = styles(Text)`
    font-size: 16px;
`;

const SummaryInfo = styles(Text)`
    font-size: 14px;
    margin-top: 20px;
`;

const TotalsCard = styles(Card)`
    width: 100%;
`;

const PaymentMethodForm = ({
    elements,
    createPaymentIntent,
    getSubscriptionDetails,
    nextPayment,
    onAttachPaymentMethod,
    onSetVisible,
    onSetInProgress,
    resetSubmitTrigger,
    stripe,
    subscription,
    triggerSubmit
}) => {

    console.log('PMF Subscription', subscription);

    const { latest_invoice, cost, cost_tax } = subscription;
    let { amount_remaining, currency, tax } = latest_invoice;
    currency = currency === 'gbp' ? '£' : '$';

    let costToDisplay = 0;
    let taxToDisplay = 0;
    let totalToDisplay = 0;

    if (latest_invoice.billing_reason === 'subscription_create') {
        costToDisplay = (cost / 100).toFixed(2);

        if (cost_tax && cost_tax !== 0) {
            taxToDisplay = (cost_tax / 100).toFixed(2);
        }

        totalToDisplay = ((cost + cost_tax) / 100).toFixed(2);
    } else {
        costToDisplay = (amount_remaining / 100).toFixed(2);

        if (tax && tax !== 0) {
            taxToDisplay = (tax / 100).toFixed(2);
        }

        totalToDisplay = ((amount_remaining + tax) / 100).toFixed(2);
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        line1: '',
        city: '',
        postal_code: ''
    });

    const setData = (item, value) => {
        const newData = { ...formData, ...{ [item]: value } }
        setFormData(newData);
    }

    const addPaymentMethod = async () => {
        try {
            onSetInProgress(true);

            console.log('Payment Method Form Data::', formData);

            const cardElement = elements.getElement('card');

            await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                    address: {
                        city: formData.city,
                        line1: formData.line1,
                        postal_code: formData.postal_code
                    }
                },
            })
                .then(async ({ paymentMethod }) => {
                    console.log('A');

                    const intentClientSecret = await onAttachPaymentMethod(paymentMethod.id);

                    console.log('B');

                    if (createPaymentIntent) {
                        console.log('C');

                        await stripe.confirmCardPayment(intentClientSecret, {
                            payment_method: paymentMethod.id
                        });

                        console.log('D');

                    } else {
                        console.log('E');

                        await stripe.confirmCardSetup(intentClientSecret, {
                            payment_method: paymentMethod.id
                        });

                        console.log('F');
                    }

                    notification['success']({
                        message: 'Payment method',
                        description:
                            'Your payment was successfully processed!',
                    });

                    getSubscriptionDetails();

                    onSetInProgress(false);
                    onSetVisible(false);

                });

        } catch (error) {
            onSetInProgress(false);
            console.log('Payment Setup Error', error);
        }
    }

    if (triggerSubmit) {
        resetSubmitTrigger();
        addPaymentMethod();
    }

    return (
        <StyledForm>
            <FormRow>
                <FormColumn>
                    <FormGroup>
                        <FormItem>
                            <Label>Name on card</Label>
                            <StyledInput size="large" placeholder="Name on card" onChange={e => setData('name', e.target.value)} />
                        </FormItem>
                        <FormItem>
                            <CardLabel>Card Number</CardLabel>
                            <StyledCardElement>
                                <CardElement
                                    hidePostalCode={true}
                                    style={{
                                        base: {
                                            'font-size': '20px',
                                        }
                                    }}
                                />
                            </StyledCardElement>
                        </FormItem>
                        <FormItem>
                            <Label>Email</Label>
                            <StyledInput size="large" placeholder="Email Address" onChange={e => setData('email', e.target.value)} />
                        </FormItem>
                        <FormItem>
                            <Label>Billing Address</Label>
                            <StyledInput size="large" placeholder="Address Line 1" onChange={e => setData('line1', e.target.value)} />
                            <StyledInput size="large" placeholder="City" onChange={e => setData('city', e.target.value)} />
                        </FormItem>
                        <FormItem>
                            <Label>Postal Code</Label>
                            <StyledInput size="large" placeholder="Postal Code" onChange={e => setData('postal_code', e.target.value)} />
                        </FormItem>
                    </FormGroup>
                </FormColumn>
                <Totals>
                    <TotalsCard title="Payment Summary">
                        <TotalsRow>
                            <TotalsDesc>
                                <TotalLabel strong>Business Plan</TotalLabel>
                                {taxToDisplay > 0 ? <TotalLabel>VAT</TotalLabel> : null}
                                <TotalLabel>Total {createPaymentIntent ? '' : '(Per month/user)'}</TotalLabel>
                            </TotalsDesc>
                            <TotalsNumbers>
                                <TotalLabel strong>{`${currency}${costToDisplay}`}</TotalLabel>
                                {taxToDisplay > 0 ? <TotalLabel>{`${currency}${taxToDisplay}`}</TotalLabel> : null}
                                <TotalLabel strong>{`${currency}${totalToDisplay}`}</TotalLabel>
                            </TotalsNumbers>
                        </TotalsRow>
                        {nextPayment ?
                            <TotalsRow>
                                <TotalsDesc>
                                    <SummaryInfo>{nextPayment}</SummaryInfo>
                                </TotalsDesc>
                            </TotalsRow>
                            :
                            null
                        }
                        <TotalsRow>
                            <TotalsDesc>
                                <SummaryInfo>No refunds. Additional users will be billed for separately.</SummaryInfo>
                            </TotalsDesc>
                        </TotalsRow>
                    </TotalsCard>
                </Totals>
            </FormRow>
        </StyledForm>
    );
}

export default injectStripe(PaymentMethodForm);