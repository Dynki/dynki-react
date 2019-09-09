import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Dropdown, Breadcrumb, Button, Icon, Menu } from 'antd';
import { withRouter } from "react-router-dom";

import DynMenu from '../menu/Menu';
import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'; 


class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { menuItems: [] };
    }
    


    // Ensure the boards have been retrieved before rendering this component.
    componentWillMount() {
        this.props.getBoards();
    }

    static getDerivedStateFromProps(props, state) {
        if (state.menuItems.length < 1 && state.boards) {
            return { menuItems: props.constructMenuItems(state, newBoard, this.loadBoard) };
        }

        return null;
    }

    displayTeam() {
        this.props.history.push('/team/1');
    }

    loadBoard(id) {
        this.props.history.push('/board/' + id);
    }

    render() {

        const menu = (
            <Menu>
              <Menu.Item>
                <a>
                  Create new team
                </a>
              </Menu.Item>
            </Menu>
          );
    
        return (
            <div className="side-menu">
                <Breadcrumb className="side-menu__bc">
                    <Breadcrumb.Item>
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Dropdown overlay={menu}>
                        <Button onClick={() => this.displayTeam()} type="dashed">{this.props.domainName}</Button>
                    </Dropdown>
                </Breadcrumb>
                <DynMenu menu={this.state.menuItems} selectedKeys={this.props.selectedKeys}></DynMenu>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

      selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
      domainName: state.domain.name,
      constructMenuItems: (state, loadBoard, newBoard) => {
            const constructItems = (itemArr) => {
                return itemArr.map(i => ({
                    id: i.id,
                    title: i.title,
                    target: `/board/${i.id}`,
                    action: loadBoard(i.id),
                    isFolder: i.isFolder,
                    items: i.items ? constructItems(i.items) : null
                }));
            }

            let items = [];
            if (this.state.boards.boards) {
                items = constructItems(state.boards.boards);
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
        newBoard: () => dispatch(newBoard())
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav))
