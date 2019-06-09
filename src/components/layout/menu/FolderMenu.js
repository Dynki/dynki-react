import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Input, Popconfirm } from 'antd';

const SubMenu = Menu.SubMenu;

const FolderMenu =  (props) => {

    const [selected, setSelected] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [editing, setEditing] = useState(false);

    const mouseEnter = () => {
        setHovering(true);
    }

    const mouseLeave = () => {
        setHovering(false);
    }

    const confirm = () => {

    }

    const editClicked = (e) => {
        e.preventDefault();
        setEditing(!editing);
    }

    const {handleClick, item} = props;

    return (
    <Menu 
        className="foldermenu" 
        mode="inline"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
    >
        {hovering ?
            <React.Fragment
            >
                <Popconfirm
                    title="Are you sure delete this folder?"
                    onConfirm={confirm}
                    okText="Yes delete already"
                    cancelText="No"
                >
                    <Icon 
                        type="delete" className="delete"
                    />
                </Popconfirm>
                <Icon type="edit" className="edit" onClick={(e) => editClicked(e)}/>
            </React.Fragment>
        :
            <Icon type={selected ? 'folder-open' : 'folder'} />
        }
        <SubMenu 
            className="folder-subfolder"
            title={
                <span
                    onClick={() => setSelected(!selected)}
                >
                    {editing ?
                        <span>{item.title}</span>
                        :
                        <Input placeholder="Basic usage" />
                    }
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
    </Menu>);
}

export default FolderMenu;