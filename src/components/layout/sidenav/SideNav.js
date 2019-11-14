import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import { Breadcrumb, Icon, Dropdown, Menu, Tooltip, Divider } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 
import { setDomain } from '../../../store/actions/authActions';
import { getTeam } from '../../../store/actions/teamActions';

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

        const menuItems = [
            { key: 1, title: 'Inbox', icon: 'mail', live: false },
            { key: 2, title: 'Boards', icon: 'schedule', action: newBoard(), live:true, 
                items: items },
            { key: 3, title: 'Projects', icon: 'rocket', live: false },
            { key: 4, title: 'Tags', icon: 'tags', live: false }
        ]

        return menuItems;
    }

    loadBoard = (id) => {
        console.log('LOAD BOARD::', id);
        this.props.history.push('/board/' + id);
        this.props.getBoard(id);
    }

    // Ensure the boards have been retrieved before rendering this component.
    componentWillMount() {
        this.props.getBoards();
    }

    componentDidMount() {
        this.setState({ menuItems: this.constructItems });
    }

    handleMenuClick = async (e) => {
        const { setDomain, getTeam, getBoards } = this.props;

        this.setState({ loadingTeam: true });

        await setDomain(e.key);
        await getTeam(e.key);
        await getBoards();
        this.setState({ loadingTeam: false });

        if (this.props.boards) {
            this.loadBoard(this.props.boards[0].id);
        }
    }

    handleButtonClick = () => {
        this.props.history.push(`/team/${this.props.team.id}`);
    }

    render() {

        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                {this.props.teams && this.props.teams.length > 0 ? this.props.teams.map((t, idx) => {
                    return <Menu.Item key={t.id}><Icon type="team" /> {t.display_name}</Menu.Item>
                }) : null }
            </Menu>
        );
        const teamName = this.props.team ? this.props.team.display_name : '';
        const btnLoading = !this.props.team || this.state.loadingTeam ? true : false;

        return (
            <div className="side-menu">
                <Breadcrumb className="side-menu__bc">
                    <Breadcrumb.Item>
                        <Icon type="home"/>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Tooltip placement="topRight" title="Choose a team">
                            <Dropdown.Button type="dashed" overlay={menu} icon={<Icon type="team" />} onClick={this.handleButtonClick}>
                                {btnLoading ? 
                                    <React.Fragment>
                                        {'Loading team - '}
                                        <Icon type="loading" />
                                    </React.Fragment>
                                    :
                                    teamName
                                }
                            </Dropdown.Button>
                        </Tooltip>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Divider dashed={true} style={{ margin: '0px', marginTop: '4px' }}/>
                { this.props.boards ?
                    <DynMenu loadingBoards={btnLoading} menu={this.initialiseMenuItems()} selectedKeys={this.props.selectedKeys}></DynMenu>        
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

      selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
      domainName: state.domain.name,
      boards: state.boards.boards,
      teams: state.teams.teams,
      team: state.teams.currentTeam
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTeam: (id) => dispatch(getTeam(id)),
        getBoards: () => dispatch(getBoards()),
        getBoard: (id) => dispatch(getBoard(id)),
        newBoard: () => dispatch(newBoard()),
        setDomain: (id) => dispatch(setDomain(id)),
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav))
