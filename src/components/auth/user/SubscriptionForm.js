import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Icon, Popconfirm, Row, Col, Statistic, Skeleton } from 'antd';
import styles from 'styled-components';

import { getSubscriptionDetails, detachPaymentMethod, setDefaultPaymentMethod } from '../../../store/actions/subscriptionActions';
import { updateUserProfile, deleteAccount } from '../../../store/actions/authActions';
import { Subscriptions } from '../../../store/model/Subscriptions';
import CheckoutModal from './CheckoutModal';
import PaymentMethods from './PaymentMethods';
import InvoiceHistory from './InvoiceHistory';

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

    renderDowngrade = status => {
        return this.subsHelper.allowDowngrade(status) ? this.renderCancelSubscriptionButton() : null;
    }

    renderUpgrade = status => {
        return this.subsHelper.allowUpgrade(status) ? this.renderPaymentButton('Upgrade to business plan') : null;
    }

    renderPaymentMethods = (status, paymentMethods) => {
        return !this.subsHelper.allowUpgrade(status) ? this.renderPaymentMethodsContent(paymentMethods) : null;
    }

    renderInvoices = () => {
        return this.renderInvoiceHistory();
    }

    renderUpgradeButton = () => {
        return <Button type="primary" size="large">Upgrade to Business Plan</Button>
    }

    renderPaymentButton = label => {
        return (
            <StyledPaymentButton>
                <CheckoutModal label={label} teamName={this.props.team}/>
            </StyledPaymentButton>
        );
    }

    renderCancelSubscriptionButton = () => {
        return (
            <StyledAccountCard title="Downgrade to Personal Plan">
                <Popconfirm 
                    title="Are you sure you want to downgrade to personal plan?" 
                    okText="Yes cancel my subscription"
                    okType="danger"
                    cancelText="No, keep it like this!!"
                    onConfirm={this.props.deleteAccount}
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                >
                    <DowngradeButton icon="arrow-down" id="btnCancelSubscription" type="danger" size="large">Downgrade To Personal Plan</DowngradeButton>
                </Popconfirm>
            </StyledAccountCard>
        );
    }

    renderPaymentMethodsContent = () => {
        const { detachPaymentMethod, setDefaultPaymentMethod, subscription } = this.props;

        return (
            <PaymentMethods 
                subscription={subscription}
                handleDelete={detachPaymentMethod}
                handleSetDefault={setDefaultPaymentMethod}
            />
        );
    }

    renderInvoiceHistory = () => {
        return <InvoiceHistory subscription={this.props.subscription}/>
    }

    renderCancelTrialButton = () => {
        return (
            <Popconfirm 
                className="userprofile__removeac-btn"
                title="Are you sure you want to downgrade to personal plan?" 
                okText="Yes cancel my trial"
                okType="danger"
                cancelText="No, keep it like this!!"
                onConfirm={this.props.deleteAccount}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
                <DowngradeButton id="btnCancelSubscriotion" type="danger" size="large">Cancel My Trial</DowngradeButton>
            </Popconfirm>
        );
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
                children: <Button id="btnRemoveAccount" icon="delete" type="danger" size="large">Remove My Account Forever</Button> 
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

    renderPlanDetails() {
        const { status } = this.props.subscription;

        return (
            <Card title="Subscription Details">
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Current Plan" value={this.getPlanName(status)} />
                    </Col>
                    <Col span={12}>
                        <StyledStatistic title="Subscription Status" value={this.getPlanStatus(status)} />
                        {this.renderUpgrade(status)}
                    </Col>
                </Row>
            </Card>
        )
    }

    render() {
        const { status, data } = this.props.subscription;

        console.log(this.props.subscription.data);

        return (
            data ? 
                <React.Fragment>
                    {this.renderPlanDetails()}
                    {this.renderPaymentMethods(status, data.PaymentMethods)}
                    {this.renderInvoices()}
                    {this.renderDowngrade(status)}
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
        return {
          subscription: Form.createFormField({
            ...props.subscription.status.toLocaleUpperCase(),
            value: props.subscription.status.toLocaleUpperCase(),
          })
        };
    }
})(SubscriptionForm);

export const mapStateToProps = (state) => {
    return{
      subscription: state.subscription,
      team: state.domain.name
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
        deleteAccount: () => dispatch(deleteAccount()),
        detachPaymentMethod: paymentMethodId => dispatch(detachPaymentMethod(paymentMethodId)),
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails()),
        setDefaultPaymentMethod: paymentMethodId => dispatch(setDefaultPaymentMethod(paymentMethodId)),
        updateUserProfile: (updatedValues) => dispatch(updateUserProfile(updatedValues)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSubscriptionForm);
