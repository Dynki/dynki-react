import React from 'react';
import { HomeOutlined, LoadingOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Menu, Tooltip } from 'antd';
import styled from 'styled-components';

const StyledBreadcrumb = styled(Breadcrumb)`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;   
`;

const SelectTeamButton = styled.div`
    button:nth-child(1) {
        min-width: ${props => props.hideHome ? '200px' : '150px'};
        max-width: ${props => props.hideHome ? '200px' : '150px'};
        overflow: hidden;
    }
`;

const SideNavBreadCrumb = ({ loading, teams, teamName, displayTeam, isActiveSubscriber, selectTeam, hideHome }) => {
    const menu = (
        <Menu onClick={selectTeam}>
            {teams && teams.length > 0 ? teams.map(t => {
                return <Menu.Item key={t.id}><TeamOutlined /> {t.display_name}</Menu.Item>;
            }) : null }
        </Menu>
    );

    const renderHome = (hideHome) => {
        return hideHome ? null : <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>;
    }

    const teamTooltip = !isActiveSubscriber() ? null : 'Choose a team';

    return (
        <StyledBreadcrumb>
            {renderHome(hideHome)}
            <Breadcrumb.Item>
                <Tooltip placement="right" title={teamTooltip}>
                    <SelectTeamButton hideHome={hideHome}>
                        <Dropdown.Button
                            data-testid="displayTeam" 
                            type="dashed" 
                            overlay={menu}
                            icon={<TeamOutlined />} 
                            onClick={displayTeam}
                            disabled={!isActiveSubscriber()}
                        >
                            {loading ? 
                                <React.Fragment>
                                    {'Loading team - '}
                                    <LoadingOutlined />
                                </React.Fragment>
                                :
                                teamName
                            }
                        </Dropdown.Button>
                    </SelectTeamButton>
                </Tooltip>
            </Breadcrumb.Item>
        </StyledBreadcrumb>
    );
}

export default SideNavBreadCrumb;