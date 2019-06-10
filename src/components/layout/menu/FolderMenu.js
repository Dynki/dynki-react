import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Drawer } from 'antd';

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
    <Menu 
        className="foldermenu" 
        mode="inline"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
    >
        <SubMenu 
            className="folder-subfolder"
            title={
                <span
                    onClick={() => setSelected(!selected)}
                >
                    <Icon type={selected ? 'folder-open' : 'folder'} />
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
                <Icon type="edit" className="edit" onClick={() => setVisible(true)}/>
                <Drawer
                    title="Edit Folder"
                    placement="right"
                    closable={true}
                    onClose={() => setVisible(false)}
                    visible={visible}
                    width={370}
                >
                    <FolderForm folder={item}/>
                </Drawer>
            </React.Fragment>
        :
            null
        }
    </Menu>);
}

export default FolderMenu;