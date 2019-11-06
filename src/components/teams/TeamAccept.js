import React from 'react';
import { Button, Icon, PageHeader, Result, Typography } from 'antd';
import styles from './TeamAccept.module.css';

const { Text } = Typography;

const TeamAccept = (props) => {

    const routes = [
        {
          path: 'index',
          breadcrumbName: 'Team',
        },
        {
            path: 'first',
            breadcrumbName: 'Dynki',
        },
          {
          path: 'second',
          breadcrumbName: 'Invite',
        }
    ];

    return (
        <React.Fragment>
            <PageHeader
                breadcrumb={{ routes }}                
            >
                <Text style={{color: '#3095DE'}}>Someone invited you to their team!</Text>
            </PageHeader>
            <div className={styles.container}>
                    <Result
                        icon={<Icon type="question-circle" theme="filled" style={{'color': '#FCB900'}}/>}
                        title="You have been invited to join team 'Dynki'"
                        subTitle="Click the button to join the team"
                        extra={<Button type="primary" size="large" icon="check">Accept</Button>}
                    />
            </div>
        </React.Fragment>
    );
}

export default TeamAccept;