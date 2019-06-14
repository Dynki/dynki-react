import React from 'react';
import { Menu } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import DynSubMenu from './SubMenuItem';

const DynMenu = (props) => {

    // Map over items in this menu to create menu items. 
    return (
      <Droppable droppableId="Main-Menu" type="menuitems">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
          </div>
        )}
      </Droppable>
    );
}

export default DynMenu;