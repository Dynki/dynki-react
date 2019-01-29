import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Icon, Button, Tooltip } from 'antd';

const SubMenu = Menu.SubMenu;

class DynSubMenu extends React.Component {

    // Triggered by clicking a menu item.
    handleClick = (e, action) => {
        // Dispatches the action associated with this menu item's properties.
        this.props.itemClicked(action);
    }

    // Triggered by clicking a menu items function button (e.g. the add new board button).
    handleBtnClick = (e, action) => {
        // Dispatches the action associated with this menu item's properties.
        this.props.btnClicked(action);
    }

    render() {
        const {itemClicked, btnClicked, title, icon , items, act, ...other} = this.props;

        return (
            <div>
            { items ? (
                <div className="submenu">
                    <SubMenu {...other} key={this.props.key+title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
                    { items.map((i, idx) => (
                        <Menu.Item {...other} key={idx+title}>
                            <Link onClick={(e) => this.handleClick(e, i.action)} to={i.target} key={idx+title}>
                                {i.title}
                            </Link>
                        </Menu.Item>)) 
                    }
                    </SubMenu>
                    <Tooltip placement="right" title="New Board">
                        <Button className="btn-add-board" onClick={(e) => this.handleBtnClick(e, act)}  type="dashed" shape="circle" icon="plus"></Button>
                    </Tooltip>
                </div>
            ): (
                <Menu.Item {...other} key={this.props.key+title}><Icon type={icon}/>{title}</Menu.Item>
            )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        itemClicked: (dispatchAction) => { 
            return dispatch(dispatchAction)
        },
        btnClicked: (dispatchAction) => {
            return dispatch(dispatchAction)
        }
    }
}


export default connect(null, mapDispatchToProps)(DynSubMenu);