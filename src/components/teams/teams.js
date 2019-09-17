import React from 'react';
import { connect } from 'react-redux';

import { PageHeader, Menu, Dropdown, Icon, Button, Tag, Typography, Row } from 'antd';
import TeamGroups from './teams-group';
import TeamMembers from './teams-members';

const { Paragraph } = Typography;

// Container for teams components.
export class Teams extends React.Component {



    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        Disable team
                </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        Remove team
                </a>
                </Menu.Item>
            </Menu>
        );
    
        const IconLink = ({ src, text }) => (
            <a
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
            </a>
        );

        const content = (
    
            <div className="content">
                <Paragraph>
                    Below is all the functionality you require to be able to manage your team, go ahead and 
                    add some users to get started.
              </Paragraph>
                <Paragraph>
                    Why not start by organising your team into groups. For example you could add groups of admin, users
                    to get going. You can always add more groups and reorganise users between groups at a later point.
              </Paragraph>
                <Row className="contentLink" type="flex">
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                        text="Invite a team member"
                    />
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                        text=" Disable Team"
                    />
                    <IconLink
                        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                        text="Team Info"
                    />
                </Row>
            </div>
        );
    
        const DropdownMenu = () => {
            return (
                <Dropdown key="more" overlay={menu}>
                    <Button
                        style={{
                            border: 'none',
                            padding: 0,
                        }}
                    >
                        <Icon
                            type="ellipsis"
                            style={{
                                fontSize: 20,
                                verticalAlign: 'top',
                            }}
                        />
                    </Button>
                </Dropdown>
            );
        };
    
        const routes = [
            {
                path: 'team',
                breadcrumbName: 'Team',
            },
            {
                path: 'first',
                breadcrumbName: 'Team11',
            }
        ];
    
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


        return (
            <div className="teams">
                <PageHeader
                    title="Team11"
                    subTitle="Like spokes in a wheel"
                    tags={<Tag color="blue">2 Team members</Tag>}
                    extra={[
                        <Button key="3">Add a group</Button>,
                        <Button key="1" type="primary">
                            Add a team member
                        </Button>,
                        <DropdownMenu key="more" />,
                    ]}
                    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                    breadcrumb={{ routes }}
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
                        <TeamGroups/>
                    </div>
                    <div className="teams__members">
                        <TeamMembers/>
                    </div>
                </div>
        </div>);
    };

}

export const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams,
        team: state.teams.currentTeam,
        progress: state.base.progress
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);



