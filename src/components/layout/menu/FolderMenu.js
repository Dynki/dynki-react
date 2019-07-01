import React, { useState } from 'react';
import { Icon, Drawer, Tree } from 'antd';

import FolderForm from './FolderForm';

const { TreeNode } = Tree;

const FolderMenu =  (props) => {

    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
 
    const mouseEnter = () => {
        setHovering(true);
    }

    const mouseLeave = () => {
        setHovering(false);
    }

    const {item} = props;

    return (
    <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
    >
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

        <React.Fragment>
            {item.items ? item.items.map(i2 => (
                <TreeNode title={i2.title} key={i2.id} isLeaf />
            )) : null}
            {hovering ?
                <React.Fragment>
                    <Icon type="edit" className="edit" onClick={() => setVisible(true)}/>
                </React.Fragment>
            :
                null
            }
        </React.Fragment>
    </div>);
}

export default FolderMenu;