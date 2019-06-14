import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Icon, Button, Tooltip } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

import { addNewFolder } from '../../../store/actions/boardActions';
import FolderMenu from './FolderMenu';

const SubMenu = Menu.SubMenu;

class DynSubMenu extends React.Component {

    // Triggered by clicking a menu item.
    handleClick = (e, action) => {
        // Dispatches the action associated with this menu item's properties.
        this.props.itemClicked(action);
    }

    // Triggered by clicking a menu items function button (e.g. the add new board button).
    handleBtnClick = (e, action) => {
        // Dispatches the action associated with this menu item's properties.
        this.props.btnClicked(action);
    }

    // Triggered by clicking the add new folder button.
    addFolder = () => {
        // Dispatches the action to add a new folder to this board.
        this.props.addFolder();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.items !== nextProps.items) {
            return true;
        }

        return false;
    }

    render() {
        const {itemClicked, btnClicked, addFolder, title, icon , items, act, selectedKeys, ...other} = this.props;

        return (
            <div>
            { items ? (
                <div className="submenu">
                    <SubMenu {...other} key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
                        { items.map((i, idx) => (
                            <React.Fragment key={idx}>
                                {i.isFolder ? 
                                <Draggable key={idx} draggableId={i.id} index={idx}>
                                {provided => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps} >
                                        <FolderMenu handleClick={this.handleClick} item={i}/>
                                    </div>
                                )}
                                </Draggable>
                                :
                                <Draggable key={idx} draggableId={i.id} index={idx}>
                                {provided => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps} >
                                        <Menu.Item {...other} key={i.id}>
                                            <Link onClick={(e) => this.handleClick(e, i.action)} to={i.target} key={i.id}>
                                                {i.title}
                                            </Link>
                                        </Menu.Item>
                                        </div>
                                )}
                                </Draggable>
                                }
                            </React.Fragment>
                            )) 
                        }
                        <Menu.Item {...other} key={'newFolder'} onClick={this.addFolder}><Icon type="folder-add"/> New folder</Menu.Item>
                    </SubMenu>
                    <Tooltip placement="right" title="New Board">
                        <Button id={'btn' + title} className="btn-add-board" onClick={(e) => this.handleBtnClick(e, act)}  type="dashed" shape="circle" icon="plus"></Button>
                    </Tooltip>
                </div>
            ): (
                <Tooltip placement="right" title="Coming Soon">
                    <Menu.Item {...other} key={title}><Icon type={icon}/>{title}</Menu.Item>
                </Tooltip>
            )}
            </div>
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

export default connect(null, mapDispatchToProps)(DynSubMenu);