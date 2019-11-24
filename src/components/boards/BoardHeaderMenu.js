import React from 'react';
import { Divider, Icon, Popconfirm, Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import { removeBoard } from '../../store/actions/boardActions';

import BoardSettings from './BoardSettings';

class BoardHeaderMenu extends React.Component {

    constructor(props) {
        super();
        this.state = { deleted: false }
    }

    handleConfirm = (e) => {
        this.setState({ deleted: true });
        this.props.removeBoard(this.props.boardId)
    }

    menu = (
        <Menu>
            <Menu.Item>
                <BoardSettings/>
            </Menu.Item>
            <Menu.Item disabled>
                <Divider style={{ margin: '0' }} dashed />
            </Menu.Item>
            <Menu.Item>
                <Popconfirm title="Are you sure delete this board?"
                    okText="Yes"
                    cancelText="No Way"
                    trigger="click"
                    placement="bottomLeft"
                    onConfirm={this.handleConfirm.bind(this)}>
                    <a><Icon type="delete" style={{ paddingRight: '10px' }}/> Delete board</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    render() {
        return <div>
            <Dropdown overlay={this.menu}>
                <Button shape="circle" icon="bars" className="board__header__btn"/>
            </Dropdown>
        </div>
    }
}

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeBoard: (rowIdx) => dispatch(removeBoard(rowIdx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeaderMenu);
