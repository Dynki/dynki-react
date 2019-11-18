import React from 'react';
import { Button, Icon, PageHeader, Result, Typography } from 'antd';
import { connect } from 'react-redux';
import styles from './TeamAccept.module.css';
import { acceptInvite } from '../../store/actions/teamActions';

import AppContext from '../../context/appContext';

const { Text } = Typography;

class TeamAccept extends React.Component {

    static contextType = AppContext;

    routes = [
        {
          path: 'index',
          breadcrumbName: 'Team',
        },
        {
            path: 'first',
            breadcrumbName: this.context.inviteName,
        },
          {
          path: 'second',
          breadcrumbName: 'Invite',
        }
    ];

    acceptTheInvite = () => {
        this.props.acceptInvite(this.context.invite).then(() => this.context.resetInvite());
    }

    render() {
        const routes = this.routes;

        return (
        <React.Fragment>
            <PageHeader
                breadcrumb={{ routes }}                
            >
                <Text style={{color: '#3095DE'}}>{`You have been cordially invited to join team ${this.context.inviteName}`}</Text>
            </PageHeader>
            <div className={styles.container}>
                    <Result
                        icon={<Icon type="usergroup-add" style={{'color': '#FCB900'}}/>}
                        title={`You have been invited to join team '${this.context.inviteName}'`}
                        subTitle="Click the button to join the team"
                        extra={<Button
                            type="primary"
                            size="large"
                            icon="check"
                            loading={this.props.progress}
                            onClick={this.acceptTheInvite}
                        >
                            Accept
                        </Button>}
                    />
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        progress: state.base.progress,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvite: (id) => dispatch(acceptInvite(id)),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAccept);