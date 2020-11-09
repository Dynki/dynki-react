import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Popconfirm } from 'antd'
import styles from 'styled-components'
import authWrapper from '../auth/AuthWrapper'

import ReorderDrawer from './ReorderDrawer'

const MenuIcon = styles(EllipsisOutlined)`
    color: ${props => props.hovering === 'true' ? '#3095DE' : '#595959'};
    cursor: pointer;
    width: 7px;
    height: 10px;
    padding-right: 10px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
`

const BoardColumnMenu = ({ allowWrite, column, columns, hasRole, onRemoveColumn, user }) => {

  const [visible, setVisible] = React.useState(false)

  const handleClick = e => {
    if (e.key !== '2') {
      setVisible(false)
    }
  }

  const handleVisibleChange = flag => {
    setVisible(flag)
  };

  const renderMenu = () => {
    if (!user) {
      return null
    }

    return (
      <Menu
        onClick={handleClick}
      >
        <Menu.Item disabled={!hasRole('BOARD_CREATORS')} key="1">
          <ReorderDrawer columns={columns} disabled={!hasRole('BOARD_CREATORS')} />
        </Menu.Item>
        <Menu.Item disabled={!hasRole('BOARD_CREATORS')} key="2">
          <Popconfirm title="Are you sure delete this column?"
            okText="Yes"
            cancelText="No Way"
            trigger="click"
            placement="bottomLeft"
            onConfirm={() => onRemoveColumn(column.model)}
          >
            <a href="no-ref"><EllipsisOutlined style={{ paddingRight: '10px' }} /> Delete Column</a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown 
      overlay={renderMenu()} 
      placement="bottomRight"
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <MenuIcon type="ellipsis"/>
    </Dropdown>
  )
}

export default authWrapper(BoardColumnMenu)
