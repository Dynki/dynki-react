import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Icon, Popconfirm, Row, Col, Statistic, Skeleton } from 'antd';
import styles from 'styled-components';

import { updateUserProfile, deleteAccount } from '../../../store/actions/authActions';
import { Subscriptions } from '../../../store/model/Subscriptions';
import PaymentMethodModal from './PaymentMethodModal';
import PaymentMethods from './PaymentMethods';
import InvoiceHistory from './InvoiceHistory';

import { 
    cancelSubscription, 
    detachPaymentMethod, 
    getSubscriptionDetails, 
    reactivateAccount,
    setDefaultPaymentMethod 
} from '../../../store/actions/subscriptionActions';


const DowngradeButton = styles(Button)`
    background-color: #F5A113;
    border-color: #F5A113;
`;

const StyledAccountCard = styles(Card)`
    margin-top: 20px;
`;

const StyledPaymentButton = styles.div`
    margin-top: 30px;
`;

const StyledStatistic = styles(Statistic)`

    .ant-statistic-content-value {
        color: ${props => props.value === 'Payment Overdue' ? '#FF6900' : '#000000d9'}
    }
`;

const CostStatistic = styles(Statistic)`

    .ant-statistic-content-value {
        font-size: 20px;
    }
`;

const ExiredDetails = styles.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Reactivate = styles(Button)`
    margin-top: 20px;
`;

class SubscriptionForm extends React.Component {

    subsHelper = null;

    constructor(props) {
        super(props);
        this.subsHelper = new Subscriptions();
    }

    componentDidMount() {
        this.props.getSubscriptionDetails();
    }

    onHandleDelete = paymentMethodId => {
        this.props.detachPaymentMethod(paymentMethodId)
    }

    renderDowngrade = (status, subscription) => {
        return this.subsHelper.allowDowngrade(status, subscription) ? this.renderCancelSubscriptionButton(status) : null;
    }

    renderUpgrade = status => {
        return this.subsHelper.allowUpgrade(status) ? this.renderPaymentButton('Upgrade to business plan') : null;
    }

    renderReactivate = (status, subscription) => {
        return this.subsHelper.allowReactivate(status, subscription) ? this.renderReactivateButton() : null;
    }

    renderPaymentMethods = (status, paymentMethods) => {
        return !this.subsHelper.allowUpgrade(status) ? this.renderPaymentMethodsContent(paymentMethods) : null;
    }

    renderInvoices = () => {
        return this.renderInvoiceHistory();
    }

    renderReactivateButton = () => {
        return <Reactivate 
                    icon="redo"
                    disabled={this.props.progress}
                    type="primary"
                    size="large"
                    onClick={() => this.props.reactivateAccount()}
                >
                    Reactivate Business Plan
                </Reactivate>
    }

    renderPaymentButton = label => {
        const { subscription } = this.props;
        const { status } = subscription;
        const { trial_end } = subscription.data;

        const trialEndDate = this.subsHelper.getTrialEndDate(status, trial_end);
        let nextPayment = undefined;

        const createPaymentIntent = this.subsHelper.createPaymentIntent(status);

        if (trialEndDate !== '') {
            nextPayment = `First payment due: ${trialEndDate}`
        }

        return (
            <StyledPaymentButton>
                <PaymentMethodModal 
                    subscription={subscription.data}
                    buttonText="Submit Purchase" 
                    label={label} 
                    nextPayment={nextPayment}
                    title="Purchase Business Plan"
                    createPaymentIntent={createPaymentIntent}
                    afterClose={() => this.props.getSubscriptionDetails()}
                    successText="Your payment was succesfully processed"
                />
            </StyledPaymentButton>
        );
    }

    renderCancelSubscriptionButton = (status) => {

        const title = status === 'trialing' ? 'Cancel Free Trial' : 'Downgrade to Personal Plan';
        const confTitle = status === 'trialing' ? 'Are you sure you want to cancel your free trial?' : 'Are you sure you want to downgrade to personal plan?';
        const okText = status === 'trialing' ? 'Yes cancel my trial' : 'Yes cancel my subscription';

        return (
            <StyledAccountCard title={title}>
                <Popconfirm 
                    title={confTitle} 
                    okText={okText}
                    okType="danger"
                    cancelText="No, keep it like this!!"
                    onConfirm={this.props.cancelSubscription}
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                >
                    <DowngradeButton disabled={this.props.progress} icon="arrow-down" id="btnCancelSubscription" type="danger" size="large">{title}</DowngradeButton>
                </Popconfirm>
            </StyledAccountCard>
        );
    }

    renderPaymentMethodsContent = () => {
        const { detachPaymentMethod, setDefaultPaymentMethod, subscription } = this.props;
        const { status } = subscription;
        const createPaymentIntent = this.subsHelper.createPaymentIntent(status);

        return (
            <PaymentMethods 
                subscription={subscription}
                reactivateAllowed={this.subsHelper.allowReactivate(status, subscription.data)}
                handleDelete={detachPaymentMethod}
                handleSetDefault={setDefaultPaymentMethod}
                createPaymentIntent={createPaymentIntent}
                afterClose={() => this.props.getSubscriptionDetails()}
            />
        );
    }

    renderInvoiceHistory = () => {
        return <InvoiceHistory subscription={this.props.subscription}/>
    }

    renderDeleteAccount() {
        return <StyledAccountCard title="Permanently Delete Account">

            {this.renderPopConfirm({
                title: "Are you sure？There is no going back once you confirm",
                okText: "Yes Remove My Account",
                okType: "danger",
                cancelText: "No way, I want to stay!!",
                onConfirm: this.props.deleteAccount,
                icon: <Icon type="question-circle-o" style={{ color: 'red' }} />,
                children: <Button disabled={this.props.progress} id="btnRemoveAccount" icon="delete" type="danger" size="large">Remove My Account Forever</Button> 
            })}
        </StyledAccountCard>
    }

    renderPopConfirm({ title, okText, okType, cancelText, onConfirm, icon, children }) {
        return (
            <Popconfirm 
                title={title}
                okText={okText}
                okType={okType}
                cancelText={cancelText}
                onConfirm={onConfirm}
                icon={icon}
            >
                {children}
            </Popconfirm>
        );
    }

    getPlanName = status => {
        return this.subsHelper.getPlanName(status);
    }

    getPlanStatus = status => {
        return this.subsHelper.getPlanStatus(status);
    }

    getPlanCost = subscription => {
        return this.subsHelper.getPlanCost(subscription);
    }

    renderPlanDetails() {
        const { subscription } = this.props;
        const { status } = subscription;
        const { trial_end, cancel_at } = subscription.data;
        const trialEndDate = this.subsHelper.getTrialEndDate(status, trial_end);
        const cancelAtDate = this.subsHelper.getCancelAtDate(status, cancel_at);

        let expires = '';

        if (trialEndDate) {
            expires = `Expires: ${trialEndDate}`;
        }

        if (cancelAtDate) {
            expires = `Expires: ${cancelAtDate}`;
        }

        return (
            <Card title="Subscription Details">
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Statistic title="Current Plan" value={this.getPlanName(status)} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <StyledStatistic title="Business Plan Subscription Status" value={this.getPlanStatus(status)} />
                        <ExiredDetails>
                            {expires}
                            {this.renderUpgrade(status)}
                            {this.renderReactivate(status, subscription.data)}
                        </ExiredDetails>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <CostStatistic title="Subscription Cost" value={this.getPlanCost(subscription.data)} />
                    </Col>
                </Row>
            </Card>
        )
    }

    render() {
        const { status, data } = this.props.subscription;

        return (
            data ? 
                <React.Fragment>
                    {this.renderPlanDetails()}
                    {this.renderPaymentMethods(status, data.PaymentMethods)}
                    {this.renderInvoices()}
                    {this.renderDowngrade(status, data)}
                    {this.renderDeleteAccount()}
                </React.Fragment>
                :
                <Skeleton active={true} />
        );
    }
}

const WrappedSubscriptionForm = Form.create({ 
    name: 'subscription',
    mapPropsToFields(props) {
        const subscriptionStatus = props.subscription ? props.subscription.status.toLocaleUpperCase() : '';

        return {
          subscription: Form.createFormField({
            ...subscriptionStatus,
            value: subscriptionStatus,
          })
        };
    }
})(SubscriptionForm);

export const mapStateToProps = (state) => {
    return{
      subscription: state.subscription,
      team: state.domain.name,
      progress: state.base.progress
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
        cancelSubscription: () => dispatch(cancelSubscription()),
        deleteAccount: () => dispatch(deleteAccount()),
        detachPaymentMethod: paymentMethodId => dispatch(detachPaymentMethod(paymentMethodId)),
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails()),
        reactivateAccount: () => dispatch(reactivateAccount()),
        setDefaultPaymentMethod: paymentMethodId => dispatch(setDefaultPaymentMethod(paymentMethodId)),
        updateUserProfile: (updatedValues) => dispatch(updateUserProfile(updatedValues)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSubscriptionForm);
