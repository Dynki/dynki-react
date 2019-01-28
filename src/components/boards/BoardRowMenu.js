import React from 'react';
import { Menu, Icon, Dropdown } from 'antd';

const BoardRowMenu = (props) => {

    const menu = (<Menu>
        <Menu.Item><Icon type="delete" />Remove Row</Menu.Item>
    </Menu>);

    return <div className="row__content__menu">
        {props.hovering ? 
            <Dropdown overlay={menu} placement="bottomCenter">
                <Icon type="down-circle" />
            </Dropdown>
            : null
        }
    </div>
}

export default BoardRowMenu;