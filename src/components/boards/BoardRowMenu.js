import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { removeRow } from '../../store/actions/boardActions';

class BoardRowMenu extends React.PureComponent {

    handleConfirm = (e) => {
        this.props.removeRow(this.props.rowIdx, this.props.groupKey);
    }

    render() {
        return (
            <div className="row__content__menu">
                {this.props.hovering ? 
                    <Popconfirm title="Are you sure delete this row?" 
                        disabled={!this.props.allowWrite}
                        okText="Yes"
                        cancelText="No Way"
                        trigger="click"
                        onConfirm={this.handleConfirm.bind(this)}>
                            <DeleteOutlined className="row__content__menu__delete" />
                    </Popconfirm>
                : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeRow: (rowIdx, groupKey) => dispatch(removeRow(rowIdx, groupKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardRowMenu);
