import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Icon, Button, Tooltip, Input } from 'antd';

import { addNewFolder } from '../../../store/actions/boardActions';

const SubMenu = Menu.SubMenu;

class DynSubMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedFolders: [] };
    }

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

    addFolder = () => {
        this.props.addFolder();
    }

    folderSelected = (selectedId) => {
        console.log('Folder selected::', selectedId);

        const selectedFolders = [...this.state.selectedFolders];
        const updatedSelection = selectedFolders.includes(selectedId) ? selectedFolders.filter(f => f !== selectedId) : [...selectedFolders, selectedId];

        this.setState({ selectedFolders: updatedSelection });
    }

    render() {
        const {itemClicked, btnClicked, addFolder, title, icon , items, act, selectedKeys, ...other} = this.props;

        const selectedFolders = this.state ? this.state.selectedFolders : [];

        console.log('SelectedFolders::', selectedFolders);

        return (
            <div>
            { items ? (
                <div className="submenu">
                    <SubMenu {...other} key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
                        { items.map((i, idx) => (
                            <React.Fragment key={idx}>
                                {i.isFolder ? 
                                <Menu 
                                    className="foldermenu" 
                                    mode="inline"
                                >
                                <SubMenu 
                                    {...other}
                                    key={i.id}
                                    className="folderSubfolder"
                                    title={
                                        <span
                                        onClick={() => this.folderSelected(i.id)}
                                        >
                                            <Icon type={selectedFolders.includes(i.id) ? 'folder-open' : 'folder'} />
                                            {/* <span>{i.title}</span> */}
                                            <Input placeholder="Basic usage" />
                                        </span>
                                    }
                                >
                                    {i.items ? i.items.map((i2, idx) => (
                                        <Menu.Item {...other} key={i2.id}>
                                            <Link onClick={(e) => this.handleClick(e, i2.action)} to={i2.target} key={i2.id}>
                                                {i2.title}
                                            </Link>
                                        </Menu.Item>
                                    )) : null}
                                </SubMenu>
                                </Menu>
                                :
                                <Menu.Item {...other} key={i.id}>
                                    <Link onClick={(e) => this.handleClick(e, i.action)} to={i.target} key={i.id}>
                                        {i.title}
                                    </Link>
                                </Menu.Item>
                                }
                            </React.Fragment>)) 
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