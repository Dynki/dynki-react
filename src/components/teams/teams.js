import React from 'react';
import { connect } from 'react-redux';
import styles from 'styled-components';

import { PageHeader, Button, Tag, Typography, Row, Skeleton } from 'antd';
import TeamGroups from './teams-group';
import TeamMembers from './teams-members';
import TeamInvite from './teams-invite';
import authWrapper from '../auth/AuthWrapper';
import { 
    getTeam, 
    addTeamGroup, 
    deleteTeamGroup, 
    deleteTeamMember,
    updateTeamGroup, 
    updateTeamMember, 
    inviteTeamMember 
} from '../../store/actions/teamActions';

const { Paragraph } = Typography;

const StyledLink = styles.div`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
    text-align: start;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
    }
`;

// Container for teams components.
class Teams extends React.Component {

    state = {
        drawerVisible: false
    }

    setDrawerVisibility = (value) => {
        this.setState({ drawerVisible: value });
    }

    addGroup = () => {
        this.props.addTeamGroup(this.props.team.id);
    }

    saveGroupUpdate = (record) => {
        this.props.updateTeamGroup(record.id, record);
    }

    saveMemberUpdate = (record) => {
        this.props.updateTeamMember(record.uid, record);
    }

    render() {

        const { team, progress, hasRole } = this.props;

        if (!this.props.team) {
            return  (
            <div className="teams__skeleton">
                <Skeleton active={true} paragraph={{ rows: 4 }}></Skeleton>
            </div>)
        }

        const IconLink = ({ src, text }) => (
            <StyledLink
                style={{
                    marginRight: 16,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    style={{
                        marginRight: 8,
                    }}
                    src={src}
                    alt="start"
                />
                {text}
            </StyledLink>
        );

        const content = (
    
            <div className="content">
                <Paragraph>
                    Below is all the functionality you require to be able to manage your team. Go ahead and 
                    invite some users to get started.
              </Paragraph>
                <Paragraph>
                    Why not start by organising your team into groups. We have added groups of admin, users
                    to get you going. You can always add more groups and reorganise users between groups at a later point.
              </Paragraph>
                <Row className="contentLink" type="flex">
                    <Button disabled={!hasRole('ADMINISTRATORS')} type="link" size={"small"} onClick={() => this.setDrawerVisibility(true)}>
                        <IconLink
                            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                            text="Invite a team member"
                        />
                    </Button>
                </Row>
            </div>
        );
    
        const Content = ({ children, extraContent }) => {
            return (
                <Row className="content" type="flex">
                    <div className="main" style={{ flex: 1 }}>
                        {children}
                    </div>
                    <div
                        className="extra"
                        style={{
                            marginLeft: 80,
                        }}
                    >
                        {extraContent}
                    </div>
                </Row>
            );
        };

        return team ? 
            <React.Fragment>
                <TeamInvite 
                    members={team.members}
                    setDrawerVisibility={this.setDrawerVisibility}
                    visible={this.state.drawerVisible}
                    progress={progress}
                    inviteMember={this.props.inviteMember}
                />
                <div className="teams">
                    <PageHeader
                        title="Team Dashboard"
                        subTitle="Like spokes in a wheel"
                        tags={<Tag color="blue">{team.members.length} Team member{team.members.length === 1 ? '' : 's'}</Tag>}
                        extra={[
                            <Button disabled={!hasRole('ADMINISTRATORS')} onClick={this.addGroup} key="3">Add a group</Button>,
                            <Button 
                                data-testid="inviteButton"
                                disabled={!hasRole('ADMINISTRATORS')} 
                                onClick={() => this.setDrawerVisibility(true)} key="1" type="primary"
                            >
                                Invite a team member
                            </Button>
                        ]}
                    >
                        <Content
                            extraContent={
                                <img
                                    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
                                    alt="content"
                                />
                            }
                        >
                            {content}
                        </Content>
                    </PageHeader>

                    <div className="teams__content">
                        <div className="teams__groups">
                            <TeamGroups 
                                groups={team.groups} 
                                addGroup={this.addGroup} 
                                handleDelete={this.props.deleteTeamGroup} 
                                handleSave={this.saveGroupUpdate}
                                hasRole={hasRole}
                            />
                        </div>
                        <div className="teams__members">
                            <TeamMembers 
                                members={team.members} 
                                groups={team.groups}
                                handleSave={this.saveMemberUpdate}
                                handleDelete={this.props.deleteTeamMember} 
                                setDrawerVisibility={this.setDrawerVisibility}
                                hasRole={hasRole}
                                loading={this.props.progress}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment> : null
    };
}

export const mapStateToProps = (state) => {
    return {
        team: state.teams.currentTeam,
        domain: state.domain.domainId,
        progress: state.base.progress
    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
        getTeam: (id) => dispatch(getTeam(id)),
        addTeamGroup: (id) => dispatch(addTeamGroup(id)),
        deleteTeamGroup: (id) => dispatch(deleteTeamGroup(id)),
        deleteTeamMember: (id) => dispatch(deleteTeamMember(id)),
        updateTeamGroup: (id,  updatedGroup) => dispatch(updateTeamGroup(id, updatedGroup)),
        updateTeamMember: (id,  updatedMember) => dispatch(updateTeamMember(id, updatedMember)),
        inviteMember: (emails) => dispatch(inviteTeamMember(emails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(authWrapper(Teams));



