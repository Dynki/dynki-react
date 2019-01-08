import React from 'react';
import DynSubMenu from './SubMenuItem';
import { Menu } from 'antd';

const DynMenu = (props) => {

    // Map over items in this menu to create menu items. 
    return (
      <Menu 
        className="menu" 
        mode="inline"
      >
      { props.menu.map((c, i) => <DynSubMenu key={i} target={c.target} items={c.items} title={c.title} icon={c.icon} act={c.action}></DynSubMenu>) }
      </Menu>
    );
}

export default DynMenu;