import React from 'react';
import { Menu } from 'antd';

import DynSubMenu from './SubMenuItem';

const DynMenu = (props) => {

    // Map over items in this menu to create menu items. 
    return (
        <Menu 
          className="menu" 
          mode="inline"
          selectedKeys={props.selectedKeys}
        >
            { props.menu.map((c, i) => (
              <DynSubMenu 
                key={c.key}
                target={c.target}
                items={c.items}
                title={c.title}
                icon={c.icon}
                act={c.action}
                selectedKeys={props.selectedKeys}
              />
            ))}

        </Menu>
    );
}

export default DynMenu;