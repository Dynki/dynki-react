import React from 'react';
import { Dropdown, Icon, Menu, Popconfirm } from 'antd';
import styles from 'styled-components';
import authWrapper from '../auth/AuthWrapper';

import ReorderDrawer from './ReorderDrawer';

const MenuIcon = styles(Icon)`
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

`;

const BoardColumnMenu = ({ allowWrite, column, columns, hasRole, onRemoveColumn, user }) => {

    const [hover, setHover] = React.useState("false");

    const handleClick = object => {
        console.log('click ', object.key);
        // this.setState({
        //   current: e.key,
        // });
    };

    const renderMenu = () =>  {
        if (!user) {
            return null;
        }

        return (
            <Menu
                onClick={handleClick}
            >
                <Menu.Item disabled={!hasRole('BOARD_CREATORS')}>
                    <ReorderDrawer hovering={hover} columns={columns} disabled={!hasRole('BOARD_CREATORS')}/>
                </Menu.Item>
                <Menu.Item disabled={!hasRole('BOARD_CREATORS')}>
                    <Popconfirm title="Are you sure delete this column?"
                        okText="Yes"
                        cancelText="No Way"
                        trigger="click"
                        placement="bottomLeft"
                        onConfirm={() => onRemoveColumn(column.model)}
                    >
                        <a href="no-ref"><Icon type="delete" style={{ paddingRight: '10px' }}/> Delete Column</a>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <Dropdown overlay={renderMenu()} placement="bottomRight" onMouseEnter={() => setHover("true")} onMouseLeave={() => setHover("false")}>
            <MenuIcon type="ellipsis" hovering={hover}/>
        </Dropdown>
    )
}

export default authWrapper(BoardColumnMenu);
