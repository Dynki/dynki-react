import React from 'react';
import { Divider, Icon, Popconfirm, Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';

import { removeBoard } from '../../store/actions/boardActions';

import authWrapper from '../auth/AuthWrapper';
import BoardSettings from './BoardSettings';

const BoardHeaderMenu = ({ boardId, user, hasRole, removeBoard }) => {

    const handleConfirm = (e) => {
        removeBoard(boardId)
    }

    const renderMenu = () =>  {
        if (!user) {
            return null;
        }

        return (
            <Menu>
                {hasRole('ADMINISTRATORS') ?
                    <Menu.Item>
                        <BoardSettings/>
                    </Menu.Item> : null
                }
                {hasRole('ADMINISTRATORS') ?
                    <Menu.Item disabled>
                        <Divider style={{ margin: '0' }} dashed />
                    </Menu.Item> : null
                }
                <Menu.Item>
                    <Popconfirm title="Are you sure delete this board?"
                        okText="Yes"
                        cancelText="No Way"
                        trigger="click"
                        placement="bottomLeft"
                        onConfirm={handleConfirm}
                    >
                        <a href="no-ref"><Icon type="delete" style={{ paddingRight: '10px' }}/> Delete board</a>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <div>
            {user ? 
                <Dropdown overlay={renderMenu()}>
                    <Button shape="circle" icon="bars" className="board__header__btn"/>
                </Dropdown>
            : null }
        </div>
    )
}

const mapStateToProps = state => {
    return{
      board: state.boards.currentBoard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeBoard: (rowIdx) => dispatch(removeBoard(rowIdx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(authWrapper(BoardHeaderMenu));
