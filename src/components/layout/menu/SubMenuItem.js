import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class DynSubMenu extends React.Component {

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, action) {
        this.props.itemClicked(action);
    }

    render() {
        const {itemClicked, title, icon , items, action, ...other} = this.props;
    
        return (
            <div>
            { items ? (
                <SubMenu {...other} key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
                { items.map(i => (
                    <Menu.Item {...other} key={i.title}>
                        <Link onClick={(e) => this.handleClick(e, i.action)} to={i.target} key={i.id}>
                            {i.title}
                        </Link>
                    </Menu.Item>)) }
                </SubMenu>
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
    }
}


export default connect(null, mapDispatchToProps)(DynSubMenu);