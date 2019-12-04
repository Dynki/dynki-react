import React from 'react';
import { Breadcrumb, Icon, Dropdown, Menu, Tooltip } from 'antd';
import styled from 'styled-components';

const StyledBreadcrumb = styled(Breadcrumb)`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;   
`;

const SelectTeamButton = styled(Dropdown.Button)`
    button:nth-child(1) {
        min-width: 150px;
    }
`;

const SideNavBreadCrumb = ({ loading, teams, teamName, displayTeam, selectTeam, hideHome }) => {
    const menu = (
        <Menu onClick={selectTeam}>
            {teams && teams.length > 0 ? teams.map(t => {
                return <Menu.Item key={t.id}><Icon type="team" /> {t.display_name}</Menu.Item>
            }) : null }
        </Menu>
    );

    const renderHome = (hideHome) => {
        return hideHome ? null : <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
    }

    return (
        <StyledBreadcrumb>
            {renderHome(hideHome)}
            <Breadcrumb.Item>
                <Tooltip placement="topRight" title="Choose a team">
                    <SelectTeamButton 
                        data-testid="displayTeam" 
                        type="dashed" 
                        overlay={menu} 
                        icon={<Icon type="team" />} 
                        onClick={displayTeam}
                    >
                        {loading ? 
                            <React.Fragment>
                                {'Loading team - '}
                                <Icon type="loading" />
                            </React.Fragment>
                            :
                            teamName
                        }
                    </SelectTeamButton>
                </Tooltip>
            </Breadcrumb.Item>
        </StyledBreadcrumb>
    )
}

export default SideNavBreadCrumb;