import React from 'react';
import { Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';

import BoardRowHeaderForm from './BoardRowHeaderForm';
import BoardRowHeaderMenu from './BoardRowHeaderMenu';
import { removeColumn } from '../../store/actions/boardActions';

class BoardRowHeader extends React.Component {

    removeColumn(model) {
        this.props.removeColumn(model);
    }

    render() {
        return <tr className="table__header"> 
        {this.props.board.columns.map((c, idx) => {
            return <th 
                    key={idx} 
                    id={'column'+idx}
                    className={idx === 0 ? "table__header__columns table__header__columns--first" : "table__header__columns"}
                >
                <div key={idx} className="table__header__columns__container">
                    {idx > 0 ? (
                        <Popconfirm title="Are you sure delete this?" 
                            okText="Yes"
                            cancelText="Nada"
                            trigger="click"
                            onConfirm={() => this.removeColumn(c.model)}>
                            <Icon type="close-square" />
                        </Popconfirm>) : null
                    }
                    <BoardRowHeaderForm 
                        onUpdateBoard={this.props.onUpdateBoard}
                        board={this.props.board}
                        colIdx={idx}>
                    </BoardRowHeaderForm>
                </div>
            </th>
            })}
            <BoardRowHeaderMenu></BoardRowHeaderMenu>
        </tr>
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      removeColumn: (model) => dispatch(removeColumn(model))
    }
}


export default connect(null, mapDispatchToProps)(BoardRowHeader);