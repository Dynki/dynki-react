import React from 'react';
import { Card, PageHeader, Tabs } from 'antd';
import Media from 'react-media';

import styles from 'styled-components';
import UserProfileForm from './UserProfileForm';
import SubscriptionForm from './SubscriptionForm';
import ResetPasswordForm from '../reset/ResetPasswordForm';

const { TabPane } = Tabs;

const StyledPageHeader = styles(PageHeader)`
    .ant-page-header-heading-title {
        color: #3095DE;
    }
`;

const StyledCard = styles(Card)`
`;

const AccountOverview = ({ getSubscriptionDetails, subscription }) => {
    return (
        <StyledPageHeader
            title="Account Dashboard"
        >
            <StyledCard style={{ width: '100%' }}>
                <Media queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 1199px)",
                    large: "(min-width: 1200px)"
                    }}>
                    {matches => (
                        <React.Fragment>
                            <Tabs tabPosition={matches.large ? 'left' : 'top'}>
                                <TabPane tab="Basic Settings" key="1">
                                    <UserProfileForm/>
                                </TabPane>
                                <TabPane tab="Billing" key="2">
                                    <SubscriptionForm subscription={subscription}/>
                                </TabPane>
                                <TabPane tab="Security" key="3">
                                        <ResetPasswordForm/>
                                </TabPane>
                            </Tabs>            
                        </React.Fragment>
                    )}
                </Media>

            </StyledCard>
        </StyledPageHeader>
    )
}

export default AccountOverview;