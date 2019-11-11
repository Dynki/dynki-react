import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import { Breadcrumb, Button, Icon, Skeleton, Dropdown, Menu } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 
import { setDomain } from '../../../store/actions/authActions';
import { getTeam } from '../../../store/actions/teamActions';

class SideNav extends React.Component {

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

    loadBoard(id) {
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

    handleMenuClick(e) {
        this.props.setDomain(e.key).then(() => {
            this.props.getTeam(e.key).then(() => {
                this.props.getBoards();
                this.props.history.push(`/team/${e.key}`);
            });

            // this.props.getTeam(this.props.match.params.id);
        });
    }

    render() {

        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                {this.props.teams && this.props.teams.length > 0 ? this.props.teams.map((t, idx) => {
                    return <Menu.Item key={t.id}>{t.display_name}</Menu.Item>
                }) : null }
            </Menu>
        );
        const teamName = this.props.team ? this.props.team.display_name : '';

        return (
            <div className="side-menu">
                <Breadcrumb className="side-menu__bc">
                    <Breadcrumb.Item>
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    
                    <Dropdown overlay={menu}>
                        <Button loading={(teamName === '')}>
                        {teamName}<Icon type="down" />
                        </Button>
                    </Dropdown>
                    </Breadcrumb.Item>
                </Breadcrumb>
                { this.props.boards ?
                    <DynMenu menu={this.initialiseMenuItems()} selectedKeys={this.props.selectedKeys}></DynMenu>        
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
