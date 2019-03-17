import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon, Tooltip } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 


class SideNav extends React.Component {

    // Ensure the boards have been retrieved before rendering this component.
    componentWillMount() {
        this.props.getBoards();
    }

    render() {

        return (
            <div className="side-menu">
                <Breadcrumb className="side-menu__bc">
                    <Breadcrumb.Item>
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Tooltip placement="right" title="Coming Soon">
                            <Button type="dashed">{this.props.domainName}</Button>
                        </Tooltip>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DynMenu menu={this.props.menuItems()} selectedKeys={this.props.selectedKeys}></DynMenu>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

      selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
      domainName: state.domain.name,

      // Declare the menu items in this application.
      menuItems: () => {
        let items = [];
        if (state.boards.boards) {
            items = state.boards.boards.map(b => ({ 
                id: b.id,
                title: b.title,
                target: `/board/${b.id}`,
                action: getBoard(b.id) 
            }))
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoards: () => dispatch(getBoards()),
        getBoard: (id) => dispatch(getBoard(id)),
        newBoard: () => dispatch(newBoard())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav)
