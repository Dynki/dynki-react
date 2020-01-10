import React from 'react';
import { Card, PageHeader, Tabs } from 'antd';

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

const AccountOverview = props => {
    return (
        <StyledPageHeader
            title="Account Dashboard"
        >
            <StyledCard style={{ width: '100%' }}>
                <Tabs tabPosition='left'>
                    <TabPane tab="Basic Settings" key="1">
                        <UserProfileForm/>
                    </TabPane>
                    <TabPane tab="Billing" key="2">
                        <SubscriptionForm/>
                    </TabPane>
                    <TabPane tab="Security" key="3">
                            <ResetPasswordForm/>
                    </TabPane>
                </Tabs>            
            </StyledCard>
        </StyledPageHeader>
    )
}

export default AccountOverview;