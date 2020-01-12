import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Card, Input, Typography } from 'antd';
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

const TotalsCard = styles(Card)`
    width: 100%;
`;

const PaymentMethodForm = ({ elements, onAttachPaymentMethod, stripe, triggerSubmit, resetSubmitTrigger }) => {

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
            .then(({paymentMethod}) => {
                onAttachPaymentMethod(paymentMethod.id);
            });
        
        } catch (error) {
            
        }
    }

    if(triggerSubmit) {
        addPaymentMethod();
        resetSubmitTrigger();
    }

    return (
        <StyledForm>
            <FormRow>
                <FormColumn>
                    <FormGroup>
                        <FormItem>
                            <Label>Name on card</Label>
                            <StyledInput size="large" placeholder="Name on card" onChange={e => setData('name', e.target.value)}/>
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
                            <StyledInput size="large" placeholder="Email Address" onChange={e => setData('email', e.target.value)}/>
                        </FormItem>
                        <FormItem>
                            <Label>Billing Address</Label>
                            <StyledInput size="large" placeholder="Address Line 1" onChange={e => setData('line1', e.target.value)}/>
                            <StyledInput size="large" placeholder="City" onChange={e => setData('city', e.target.value)}/>
                        </FormItem>
                        <FormItem>
                            <Label>Postal Code</Label>
                            <StyledInput size="large" placeholder="Postal Code" onChange={e => setData('postal_code', e.target.value)}/>
                        </FormItem>
                    </FormGroup>
                </FormColumn>
                <Totals>
                    <TotalsCard title="Payment Summary">
                        <TotalsRow>
                            <TotalsDesc>
                                <TotalLabel>Business plan x 1 user</TotalLabel>
                                <TotalLabel>VAT</TotalLabel>
                                <TotalLabel strong>Total (Per month)</TotalLabel>
                            </TotalsDesc>
                            <TotalsNumbers>
                                <TotalLabel>£5.99</TotalLabel>
                                <TotalLabel>£1.20</TotalLabel>
                                <TotalLabel strong>£7.19</TotalLabel>
                            </TotalsNumbers>
                        </TotalsRow>
                    </TotalsCard>
                </Totals>
            </FormRow>
        </StyledForm>
    );
}

export default injectStripe(PaymentMethodForm);