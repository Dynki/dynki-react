import React from 'react';
import { connect } from 'react-redux';
import { Tree,  Menu, Icon, Button, Tooltip } from 'antd';

import { addNewFolder } from '../../../store/actions/boardActions';
import FolderMenu from './FolderMenu';

const { TreeNode, DirectoryTree } = Tree;

class DynSubMenu extends React.Component {

    // Triggered by clicking a menu items function button (e.g. the add new board button).
    handleBtnClick = (e, action) => {
        // Dispatches the action associated with this menu item's properties.
        this.props.btnClicked(action);
    }

    onSelect = (keys, event) => {

        if (keys[0] === 'New') {
            this.props.addFolder();
        } else {
            // Dispatches the action associated with this menu item's properties.
            // this.props.btnClicked(action);
            const item = this.props.items.find(i => i.id === keys[0]);
    
            if (item) {
                this.props.itemClicked(item.action);
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.items !== nextProps.items) {
            return true;
        }

        return false;
    }

    onDrop = info => {
        // console.log(info);
    }

    render() {
        const {itemClicked, btnClicked, addFolder, title, icon , items, act, selectedKeys, currentBoard, loadingBoards, ...other} = this.props;

        const expandedKeys = loadingBoards ? [] : ['000001'];

        return (
            <React.Fragment>
            { items ? (
                <div className="submenu">
                    <DirectoryTree 
                        onSelect={this.onSelect} 
                        switcherIcon={<Icon type="down" />} 
                        draggable 
                        expandedKeys={expandedKeys}
                        defaultExpandedKeys={['000001']} 
                        onDrop={this.onDrop}
                        className="firstitem"
                    >
                        <TreeNode  title="Boards" key={'000001'} icon={<Icon type="schedule" />}>
                            { items.map((i, idx) => {

                                return i.isFolder ?
                                        <TreeNode 
                                            title={i.title}
                                            key={i.id}
                                        >
                                            <FolderMenu item={i} key={i.id}></FolderMenu>
                                        </TreeNode>
                                    :
                                        <TreeNode className="subitemnoicon" title={i.title} key={i.id} icon={<div className="noicon"></div>}/>
                                }) 
                            }            
                            {/* <TreeNode title={'Add new folder'} key={'New'} isLeaf icon={<Icon type="folder-add" />}/> */}
                        </TreeNode>
                    </DirectoryTree>
                    <Tooltip placement="right" title="New Board">
                        <Button id={'btn' + title} className="btn-add-board" onClick={(e) => this.handleBtnClick(e, act)}  type="dashed" shape="circle" icon="plus"></Button>
                    </Tooltip>
                </div>
            ): (
                <Tooltip placement="right" title="Coming Soon">
                    <Menu.Item {...other} key={title}><Icon type={icon}/>{title}</Menu.Item>
                </Tooltip>
            )}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFolder: () => dispatch(addNewFolder()),
        itemClicked: (dispatchAction) => dispatch(dispatchAction),
        btnClicked: (dispatchAction) => dispatch(dispatchAction)
    }
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynSubMenu);