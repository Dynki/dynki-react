import React from 'react';
import { Dropdown, Icon, Menu, Popconfirm, Tooltip } from 'antd';
import styles from 'styled-components';
import authWrapper from '../auth/AuthWrapper';

const ColumnMenu = styles.div`
    display: flex;
    flex-direction: row;
    align-content: center;
`;

const Item = styles.div`

`;

const MenuIcon = styles(Icon)`
    color: ${props => props.hover ? '#3095DE' : '#595959'};
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

const BoardColumnMenu = ({ allowWrite, column, hasRole, onRemoveColumn, user }) => {

    const [hover, setHover] = React.useState(false);

    const menuClicked = () => {
        console.log('menu clicked');
    }

    const renderMenu = () =>  {
        if (!user) {
            return null;
        }

        return (
            <Menu>
                <Menu.Item disabled={!hasRole('BOARD_CREATORS')}>
                    <Tooltip title="Reorder Columns">
                        <a href="no-ref"><Icon type="swap" style={{ paddingRight: '10px' }}/>Reorder Columns</a>
                    </Tooltip>
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
        <Dropdown overlay={renderMenu()} placement="bottomRight" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <MenuIcon type="ellipsis" hover={hover}/>
        </Dropdown>
        /* <Item onClick={menuClicked}>
                <Tooltip title="Reorder Columns">
                    <MenuIcon type="swap" />
                </Tooltip>
            </Item>            
            <Item>
                <Popconfirm 
                    title="Are you sure delete this?" 
                    disabled={!allowWrite}
                    okText="Yes"
                    cancelText="Nada"
                    trigger="click"
                    onConfirm={() => onRemoveColumn(column.model)}
                >
                    <MenuIcon type="close-square" />
                </Popconfirm>
            </Item> */
    )
}

export default authWrapper(BoardColumnMenu);
