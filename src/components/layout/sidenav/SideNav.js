import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon } from 'antd';

import DynMenu from '../menu/Menu';
import { getBoards } from '../../../store/actions/boardActions'; 


class SideNav extends React.Component {

    componentWillMount() {
        this.props.getBoards();
    }

    render() {
        let items = [];
        if (this.props.boards) {
            items = this.props.boards.map(b => ({ title: b.title }))
        }

        const MenuItems = [
            { title: 'Inbox', icon: 'mail', },
            { title: 'Boards', icon: 'schedule', 
                items: items },
            { title: 'Projects', icon: 'rocket' },
            { title: 'Tags', icon: 'tags' }
        ]

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
            <DynMenu menu={MenuItems}></DynMenu>
            
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      boards: state.boards.boards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoards: () => dispatch(getBoards())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
  )(SideNav)
