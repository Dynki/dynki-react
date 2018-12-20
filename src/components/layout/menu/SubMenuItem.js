import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const DynSubMenu = (props) => {

    const {title, icon , items, ...other} = props;

    return (
        <div>
        { items ? (
            <SubMenu {...other} key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
            { items.map(i => (<Menu.Item {...other} key={i.title}>{i.title}</Menu.Item>)) }
            </SubMenu>
        ): (
            <Menu.Item {...other} key={title}><Icon type={icon}/>{title}</Menu.Item>
        )}
        </div>
    );
}

export default DynSubMenu;