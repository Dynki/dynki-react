import React from 'react';
import { Icon, Popconfirm, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';

import BoardRowHeaderForm from './BoardRowHeaderForm';
import BoardRowHeaderGroupForm from './BoardRowHeaderGroupForm';
import BoardRowHeaderMenu from './BoardRowHeaderMenu';
import { removeColumn, addGroup, collapseGroup } from '../../store/actions/boardActions';

class BoardRowHeader extends React.Component {
    
    groupColor = '#000000a6';
    
    removeColumn(model) {
        this.props.removeColumn(model);
    }

    addGroup() {
        this.props.addGroup();
    }

    collapseGroup() {
        this.props.collapseGroup(this.props.groupKey);
    }

    render() {
        this.groupColor = '#' + this.props.board.groups[this.props.groupKey].color;
        const collapsed = this.props.board.groups[this.props.groupKey].collapsed;

        const menu = (
            <Menu>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={() => this.addGroup()}>
                    <div className="table__group__menu__row">
                        <Icon className="table__group__menu__icon" type="plus-circle" />
                        <div>New Group</div>
                    </div>
                </a>
                </Menu.Item>
                <Menu.Item disabled={this.props.board.groups && Object.keys(this.props.board.groups).length === 1}>
                <a target="_blank" rel="noopener noreferrer">
                    <div className="table__group__menu__row">
                        <Icon className="table__group__menu__icon" type="delete" />
                        <div>Remove Group</div>
                    </div>
                </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.collapseGroup()}>
                        <div className="table__group__menu__row">
                        {collapsed ? 
                            <React.Fragment>
                                <Icon className="table__group__menu__icon" type="arrow-down" />
                                <div>Expand Group</div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Icon className="table__group__menu__icon" type="arrow-up" />
                                <div>Collapse Group</div>
                            </React.Fragment>
                        }
                        </div>
                    </a>
                </Menu.Item>
            </Menu>
        );
    
        return <tr className="table__header"> 
        <th>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    <Icon style={{ color: this.groupColor }} className="table__group__menu__icon--main" type="caret-down" />
                </a>
            </Dropdown>,
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
      removeColumn: (model) => dispatch(removeColumn(model)),
      collapseGroup: (groupKey) => dispatch(collapseGroup(groupKey)),
      addGroup: () => dispatch(addGroup())
    }
}


export default connect(null, mapDispatchToProps)(BoardRowHeader);