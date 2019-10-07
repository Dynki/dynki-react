import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import { Breadcrumb, Select, Button, Icon, Tooltip } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 

const { Option } = Select;

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

    displayTeam() {
        this.props.history.push('/team/1');
    }

    render() {
        console.log(this.props.teams, 'teams');

        return (
            this.props.boards ?
            <div className="side-menu">
                <Breadcrumb className="side-menu__bc">
                    <Breadcrumb.Item>
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Select value={this.props.teams.length > 0 && this.props.teams ? this.props.teams[0].id : null} style={{ width: 170 }} >
                        {this.props.teams && this.props.teams.length > 0 ? this.props.teams.map((t, idx) => {
                            return <Option key={idx} value={t.id}>{t.display_name}</Option>
                        }) : null }
                    </Select>                    
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DynMenu menu={this.initialiseMenuItems()} selectedKeys={this.props.selectedKeys}></DynMenu>        
            </div>
            :
            null
        )
    }
}

const mapStateToProps = (state) => {
    return {

      selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
      domainName: state.domain.name,
      boards: state.boards.boards,
      teams: state.teams.teams

      // Declare the menu items in this application.
    //   menuItems: () => {
    //     const constructItems = (itemArr) => {
    //         return itemArr.map(i => ({
    //             id: i.id,
    //             title: i.title,
    //             target: `/board/${i.id}`,
    //             action: getBoard(i.id),
    //             isFolder: i.isFolder,
    //             items: i.items ? constructItems(i.items) : null
    //         }));
    //     }
   
    //     let items = [];
    //     if (state.boards.boards) {
    //         items = constructItems(state.boards.boards);
    //     }

    //     const menuItems = [
    //         { key: 1, title: 'Inbox', icon: 'mail', live: false },
    //         { key: 2, title: 'Boards', icon: 'schedule', action: newBoard(), live:true,
    //             items: items },
    //         { key: 3, title: 'Projects', icon: 'rocket', live: false },
    //         { key: 4, title: 'Tags', icon: 'tags', live: false }
    //     ]

    //     return menuItems;
    //   }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoards: () => dispatch(getBoards()),
        getBoard: (id) => dispatch(getBoard(id)),
        newBoard: () => dispatch(newBoard()),
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav))
