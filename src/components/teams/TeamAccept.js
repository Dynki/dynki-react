import React from 'react';
import { Button, Icon, PageHeader, Result, Typography } from 'antd';
import { connect } from 'react-redux';
import styles from './TeamAccept.module.css';
import { acceptInvite } from '../../store/actions/teamActions';
import { setInvite } from '../../store/actions/baseActions';

const { Text } = Typography;

class TeamAccept extends React.Component {

    routes = [
        {
          path: 'index',
          breadcrumbName: 'Team',
        },
        {
            path: 'first',
            breadcrumbName: this.props.inviteData.inviteName,
        },
          {
          path: 'second',
          breadcrumbName: 'Invite',
        }
    ];

    acceptTheInvite = () => {
        this.props.acceptInvite(this.props.inviteData.inviteId)
            .then(() => this.props.setInvite({ inviteId: undefined, inviteName: undefined }));
    }

    render() {
        const routes = this.routes;
        const { inviteData } = this.props;
        const { inviteName } = inviteData; 

        return (
        <React.Fragment>
            <PageHeader
                breadcrumb={{ routes }}                
            >
                <Text style={{color: '#3095DE'}}>{`You have been cordially invited to join team ${inviteName}`}</Text>
            </PageHeader>
            <div className={styles.container}>
                    <Result
                        icon={<Icon type="usergroup-add" style={{'color': '#FCB900'}}/>}
                        title={`You have been invited to join team '${inviteName}'`}
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
        inviteData: state.base.inviteData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvite: (id) => dispatch(acceptInvite(id)),
        setInvite: value => dispatch(setInvite(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAccept);