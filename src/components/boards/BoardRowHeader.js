import React from 'react';
import { Icon, Popconfirm, Popover } from 'antd';
import { connect } from 'react-redux';

import BoardRowHeaderForm from './BoardRowHeaderForm';
import BoardRowHeaderGroupForm from './BoardRowHeaderGroupForm';
import BoardRowHeaderMenu from './BoardRowHeaderMenu';
import { removeColumn } from '../../store/actions/boardActions';

class BoardRowHeader extends React.Component {

    menuContent = (
        <React.Fragment>
            <div className="table__group__menu__row">
                <Icon className="table__group__menu__icon" type="plus-circle" />
                <div>New Group</div>
            </div>
            <div className="table__group__menu__row">
                <Icon className="table__group__menu__icon" type="delete" />
                <div>Remove Group</div>
            </div>
        </React.Fragment>
    );

    state = {
        visible: false,
    };

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    
    removeColumn(model) {
        this.props.removeColumn(model);
    }

    render() {
        return <tr className="table__header"> 
        <th>
            <Popover
                content={this.menuContent}
                trigger="click"
                visible={this.state.visible}
                placement="bottom"
                onVisibleChange={this.handleVisibleChange}
            >
                <Icon className="table__group__menu__icon" type="caret-down" />
            </Popover>
        </th>
        <th
            className="table__header__columns table__header__columns--first"
        >
            <BoardRowHeaderGroupForm 
                onUpdateBoard={this.props.onUpdateBoard}
                board={this.props.board}
                groupKey={this.props.groupKey}>
            </BoardRowHeaderGroupForm>
        </th>
        {this.props.board.columns.map((c, idx) => {
            return idx === 0 ? null : <th 
                    key={idx} 
                    id={'column'+idx}
                    className="table__header__columns"
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