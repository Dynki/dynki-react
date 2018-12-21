import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards, getBoard } from '../../../store/actions/boardActions'; 


class SideNav extends React.Component {

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
                        <Button type="dashed">{this.props.domainName}</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DynMenu menu={this.props.menuItems()}></DynMenu>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
            { title: 'Inbox', icon: 'mail', },
            { title: 'Boards', icon: 'schedule', 
                items: items },
            { title: 'Projects', icon: 'rocket' },
            { title: 'Tags', icon: 'tags' }
        ]

        return menuItems;
      }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoards: () => dispatch(getBoards()),
        getBoard: (id) => dispatch(getBoard(id))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav)
