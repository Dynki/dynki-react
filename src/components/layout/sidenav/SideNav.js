import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import { Divider } from 'antd';

import DynMenu from '../menu/Menu';
import SideNavBreadCrumb from './SideNavBreadCrumb';
import authWrapper from '../../auth/AuthWrapper';

import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 
// import { getChannels, getChannel, newChannel } from '../../../store/actions/channelActions'; 
import { setDomain } from '../../../store/actions/authActions';
import { getTeam } from '../../../store/actions/teamActions';

const StyledSideNav = styled.div`
    height: 100%;
    border-right: 1px solid #e8e8e8;
    position: fixed;
    top: 65px;

    .ant-menu {
        .ant-menu-item {
            padding-left: 16px!important;

            &:hover {
                background-color: #e6f7ff;
                color: rgba(0, 0, 0, 0.65);
            } 
        }
    }

    i {
        font-size: 18px!important;
    }
`;

class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingTeam: false
        };
    }

    initialiseMenuItems() {
        const constructItems = (itemArr) => {
            return itemArr.map(i => ({
                id: i.id,
                title: i.title,
                target: `/board/${i.id}`,
                action: () => this.loadBoard(i.id),
                isFolder: i.isFolder,
                items: i.items ? constructItems(i.items) : null
            }));
        }

        let items = [];
        if (this.props.boards) {
            items = constructItems(this.props.boards);
        }

        // const constructChannelItems = (itemArr) => {
        //     return itemArr.map(i => ({
        //         id: i.id,
        //         title: '# ' + i.title,
        //         target: `/channel/${i.id}`,
        //         action: () => this.loadChannel(i.id),
        //     }));
        // }
        // let channelItems = [];
        // if (this.props.channels) {
        //     channelItems = constructChannelItems(this.props.channels);
        // }

        const menuItems = [
            { key: 1, title: 'Channels', icon: 'message', live: false },
            // { key: 1, title: 'Channels', icon: 'message', action: newChannel(), live: true, items: channelItems, tooltip: 'New channel' },
            { key: 2, title: 'Boards', icon: 'schedule', action: newBoard(), live:true, items: items, tooltip: 'New board' },
            { key: 3, title: 'Projects', icon: 'rocket', live: false },
            { key: 4, title: 'Tags', icon: 'tags', live: false }
        ]

        return menuItems;
    }

    loadBoard = (id) => {
        this.props.history.push('/board/' + id);
        this.props.getBoard(id);
    }

    // loadChannel = (id) => {
    //     this.props.history.push('/channel/' + id);
    //     this.props.getChannel(id);
    // }

    // Ensure the boards have been retrieved before rendering this component.
    componentWillMount() {
        this.props.getBoards();
        // this.props.getChannels();
    }

    componentDidMount() {
        this.setState({ menuItems: this.constructItems });
    }

    handleMenuClick = async (e) => {
        const { setDomain, getTeam, getBoards } = this.props;

        this.setState({ loadingTeam: true });

        console.log('load new team')

        await setDomain(e.key);
        await getTeam(e.key);
        await getBoards();
        // this.props.getChannels();
        this.setState({ loadingTeam: false });

        if (this.props.boards && this.props.boards.length > 0) {
            this.loadBoard(this.props.boards[0].id);
        }
    }

    handleButtonClick = () => {
        this.props.history.push(`/team/${this.props.team.id}`);
    }

    render() {

        const { boards, channels, hideHome, isActiveSubscriber, selectedKeys, teams } = this.props;
        const teamName = this.props.team ? this.props.team.display_name : '';
        const loading = !this.props.team || this.state.loadingTeam ? true : false;

        return (
            <StyledSideNav>
                <SideNavBreadCrumb 
                    hideHome={hideHome}
                    loading={loading}
                    teamName={teamName}
                    teams={teams}
                    selectTeam={this.handleMenuClick} 
                    displayTeam={this.handleButtonClick}
                    isActiveSubscriber={isActiveSubscriber}
                />
                <Divider dashed={true} style={{ margin: '0px', marginTop: '4px' }}/>
                { boards ?
                    <DynMenu 
                        loadingBoards={loading}
                        menu={this.initialiseMenuItems()}
                        selectedKeys={selectedKeys}
                    />        
                    :
                    null
                }
            </StyledSideNav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
      domainName: state.domain.name,
      boards: state.boards.boards,
    //   channels: state.channel.channels,
      teams: state.teams.teams,
      team: state.teams.currentTeam
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTeam: (id) => dispatch(getTeam(id)),
        getBoards: () => dispatch(getBoards()),
        getBoard: (id) => dispatch(getBoard(id)),
        // getChannels: () => dispatch(getChannels()),
        // getChannel: (id) => dispatch(getChannel(id)),
        newBoard: () => dispatch(newBoard()),
        setDomain: (id) => dispatch(setDomain(id)),
    }
}

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps)
)(authWrapper(SideNav)))
