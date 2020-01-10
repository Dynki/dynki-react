import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Icon, Popconfirm, Row, Col, Statistic } from 'antd';
import styles from 'styled-components';

import { updateUserProfile, deleteAccount } from '../../../store/actions/authActions';
import { Subscriptions } from '../../../store/model/Subscriptions';
import CheckoutModal from './CheckoutModal';

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

class SubscriptionForm extends React.Component {

    subsHelper = null;

    constructor(props) {
        super(props);
        this.subsHelper = new Subscriptions();
    }

    renderDowngrade = status => {
        return this.subsHelper.allowDowngrade(status) ? this.renderCancelSubscriptionButton() : null;
    }

    renderSetUpPayment = status => {
        return this.subsHelper.allowPaymentMethodSetup(status) ? this.renderPaymentMethodButton() : null;
    }

    renderUpgrade = status => {
        return this.subsHelper.allowUpgrade(status) ? this.renderPaymentMethodButton() : null;
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

    renderPaymentMethodButton = () => {
        return (
            <StyledPaymentButton>
                <CheckoutModal teamName={this.props.team}/>
            </StyledPaymentButton>
        );
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
                        <Statistic title="Subscription Status" value={this.getPlanStatus(status)} />
                        {this.renderUpgrade(status)}
                        {this.renderSetUpPayment(status)}
                    </Col>
                </Row>
            </Card>
        )
    }

    render() {
        const { status } = this.props.subscription;

        return (
            <React.Fragment>
                {this.renderPlanDetails()}
                {this.renderDowngrade(status)}
                {this.renderDeleteAccount()}
            </React.Fragment>
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
        updateUserProfile: (updatedValues) => dispatch(updateUserProfile(updatedValues)),
        deleteAccount: () => dispatch(deleteAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSubscriptionForm);
