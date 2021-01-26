import React from 'react'
import { connect } from 'react-redux'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { Tree, Menu, Button, Tooltip } from 'antd'

import { addNewFolder } from '../../../store/actions/boardActions'
import DynamicIcon from './DynamicIcon'
import FolderMenu from './FolderMenu'
import authWrapper from '../../auth/AuthWrapper'

const { TreeNode, DirectoryTree } = Tree

const DynSubMenu = ({
  isActiveSubscriber, 
  itemClicked, 
  btnClicked, 
  addFolder, 
  title, 
  icon,
  items, 
  act, 
  selectedKeys, 
  currentBoard, 
  loadingBoards, 
  progress, 
  hasRole, 
  tooltip, 
  onDrop,
  ...other 
}) => {

  // Triggered by clicking a menu items function button (e.g. the add new board button).
  const handleBtnClick = (e, action) => {
    // Dispatches the action associated with this menu item's properties.
    btnClicked(action)
  }

  const onSelect = (keys, event) => {

    if (keys[0] === 'New') {
      addFolder()
    } else {
      // Dispatches the action associated with this menu item's properties.
      // this.props.btnClicked(action);
      const item = items.find(i => i.id === keys[0])

      if (item) {
        itemClicked(item.action)
      }
    }
  }

  return (
    <React.Fragment>
      {items ? (
        <div className="submenu">
          <DirectoryTree
            onSelect={onSelect}
            switcherIcon={<DownOutlined />}
            draggable
            defaultExpandedKeys={['000001']}
            onDrop={onDrop}
            className="firstitem"
          >
            <TreeNode title={title} key={'000001'} icon={<DynamicIcon type={icon} />}>
              {items.map((i, idx) => {
                return i.isFolder ?
                  <TreeNode
                    title={i.title}
                    key={i.id}
                  >
                    <FolderMenu item={i} key={i.id}></FolderMenu>
                  </TreeNode>
                  :
                  <TreeNode className="subitemnoicon" title={i.title} key={i.id} icon={<div className="noicon"></div>} />
              })
              }
            </TreeNode>
          </DirectoryTree>
          <Tooltip placement="right" title={tooltip}>
            <Button id={'btn' + title} disabled={progress || !hasRole('BOARD_CREATORS')} className="btn-add-board" onClick={(e) => handleBtnClick(e, act)} type="dashed" shape="circle" icon={<PlusOutlined />}></Button>
          </Tooltip>
        </div>
      ) : (
          <Tooltip placement="right" title="Coming Soon">
            <Menu.Item {...other} key={title}><DynamicIcon type={icon} />{title}</Menu.Item>
          </Tooltip>
        )}
    </React.Fragment>
  )
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
    currentBoard: state.boards.currentBoard,
    progress: state.base.progress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(authWrapper(DynSubMenu))