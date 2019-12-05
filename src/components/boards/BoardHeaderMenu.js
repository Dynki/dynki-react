import React from 'react';
import { Divider, Icon, Popconfirm, Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import { removeBoard } from '../../store/actions/boardActions';

import BoardSettings from './BoardSettings';

class BoardHeaderMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deleted: false }
    }

    handleConfirm = (e) => {
        this.setState({ deleted: true });
        this.props.removeBoard(this.props.boardId)
    }

    renderMenu = () =>  {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return (
            <Menu>
                {user.hasRole(user.roles, 'ADMINISTRATORS') ?
                    <Menu.Item>
                        <BoardSettings/>
                    </Menu.Item> : null
                }
                {user.hasRole(user.roles, 'ADMINISTRATORS') ?
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
                        onConfirm={this.handleConfirm.bind(this)}
                    >
                        <a href="no-ref"><Icon type="delete" style={{ paddingRight: '10px' }}/> Delete board</a>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    };

    render() {
        const { user } = this.props;

        return <div>
            {user ? 
                <Dropdown overlay={this.renderMenu()}>
                    <Button shape="circle" icon="bars" className="board__header__btn"/>
                </Dropdown>
            : null }
        </div>
    }
}

const mapStateToProps = state => {
    return{
      board: state.boards.currentBoard,
      user: state.auth.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeBoard: (rowIdx) => dispatch(removeBoard(rowIdx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeaderMenu);
