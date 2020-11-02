import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { EditOutlined } from '@ant-design/icons';
import { Menu, Drawer } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import FolderForm from './FolderForm';

const SubMenu = Menu.SubMenu;

const FolderMenu =  (props) => {

    const [selected, setSelected] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
 
    const mouseEnter = () => {
        setHovering(true);
    }

    const mouseLeave = () => {
        setHovering(false);
    }

    const {handleClick, item} = props;

    return (
        <React.Fragment>
            <Drawer
                title="Edit Folder"
                placement="right"
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
                width={370}
            >
                <FolderForm folder={item} onRemoveFolder={() => setVisible(false)}/>
            </Drawer>
            <Droppable droppableId="Folder-Menu" type="menuitems">
            {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Menu 
                        className="foldermenu" 
                        mode="inline"
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    >
                        <SubMenu 
                            className="folder-subfolder"
                            onTitleClick={() => setSelected(!selected)}
                            title={
                                <span
                                >
                                    <LegacyIcon type={selected ? 'folder-open' : 'folder'} />
                                    <span>{item.title}</span>
                            </span>
                            }
                        >
                            {item.items ? item.items.map(i2 => (
                                <Menu.Item key={i2.id}>
                                    <Link onClick={(e) => handleClick(e, i2.action)} to={i2.target} key={i2.id}>
                                        {i2.title}
                                    </Link>
                                </Menu.Item>
                            )) : null}
                        </SubMenu>
                        {hovering ?
                            <React.Fragment>
                                <EditOutlined className="edit" onClick={() => setVisible(true)} />
                            </React.Fragment>
                        :
                            null
                        }
                    </Menu>
                </div>
            )}
            </Droppable>
        </React.Fragment>
    );
}

export default FolderMenu;