import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Icon, Button, Tooltip } from 'antd';

const SubMenu = Menu.SubMenu;

class DynSubMenu extends React.Component {

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleClick(e, action) {
        this.props.itemClicked(action);
    }

    handleBtnClick(e, action) {
        this.props.btnClicked(action);
    }

    render() {
        const {itemClicked, btnClicked, title, icon , items, act, ...other} = this.props;

        return (
            <div>
            { items ? (
                <div className="submenu">
                    <SubMenu {...other} key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
                    { items.map(i => (
                        <Menu.Item {...other} key={i.title}>
                            <Link onClick={(e) => this.handleClick(e, i.action)} to={i.target} key={i.id}>
                                {i.title}
                            </Link>
                        </Menu.Item>)) 
                    }
                    </SubMenu>
                    <Tooltip placement="right" title="New Board">
                        <Button onClick={(e) => this.handleBtnClick(e, act)}  type="dashed" shape="circle" icon="plus"></Button>
                    </Tooltip>
                </div>
            ): (
                <Menu.Item {...other} key={title}><Icon type={icon}/>{title}</Menu.Item>
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