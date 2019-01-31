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
        return <th className="table__header">
            <section className="table__header__columns">
                {this.props.board.columns.map((c, idx) => {
                    return idx === 0 ? (
                        <div key={idx} className="table__header__columns__container--first">
                            <BoardRowHeaderForm 
                                onUpdateBoard={this.props.onUpdateBoard}
                                board={this.props.board}
                                colIdx={idx}>
                            </BoardRowHeaderForm>
                        </div>
                    ) : (
                        <div key={idx} className="table__header__columns__container">
                            <Popconfirm title="Are you sure delete this?" 
                                okText="Yes"
                                cancelText="Nada"
                                trigger="click"
                                onConfirm={() => this.removeColumn(c.model)}>
                                <Icon type="close-square" />
                            </Popconfirm>
                            <BoardRowHeaderForm
                                onUpdateBoard={this.props.onUpdateBoard}
                                board={this.props.board}
                                colIdx={idx}>
                            </BoardRowHeaderForm>
                        </div>
                    )
                })
                }
                <BoardRowHeaderMenu></BoardRowHeaderMenu>
            </section>
        </th>
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
      removeColumn: (model) => dispatch(removeColumn(model))
    }
}


export default connect(null, mapDispatchToProps)(BoardRowHeader);