import React from 'react';
import { Icon, Popconfirm, Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import styles from 'styled-components';

import BoardRowHeaderForm from './BoardRowHeaderForm';
import BoardRowHeaderGroupForm from './BoardRowHeaderGroupForm';
import BoardRowHeaderMenu from './BoardRowHeaderMenu';
import { removeColumn, addGroup, removeGroup, collapseGroup } from '../../store/actions/boardActions';
import BoardColumnMenu from './BoardColumnMenu';
import ReorderGroupDrawer from './ReorderGroupDrawer';

const StyledLink = styles.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
    text-align: start;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
    }
`;

const Column = styles.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const ColumnTh = styles.th`
    align-items: center;
    display: flex;
    flex: 0;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 174px;
    width: 100%;
`;

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

    handleConfirm() {
        this.props.removeGroup(this.props.board.groups[this.props.groupKey].id);
    }

    render() {
        this.groupColor = '#' + this.props.board.groups[this.props.groupKey].color;
        const collapsed = this.props.board.groups[this.props.groupKey].collapsed;

        const menu = (
            <Menu>
                <Menu.Item>
                <StyledLink onClick={() => this.addGroup()}>
                    <div className="table__group__menu__row">
                        <Icon className="table__group__menu__icon" type="plus-circle" />
                        <div>New Group</div>
                    </div>
                </StyledLink>
                </Menu.Item>
                {this.props.board.groups.length > 1 ? 
                    <Menu.Item>
                        <Popconfirm title="Delete this group? Are you sure? There's no going back!!"
                            okText="Yes Delete This Group"
                            cancelText="No Way"
                            trigger="click"
                            placement="bottomLeft"
                            onConfirm={this.handleConfirm.bind(this)}
                        >
                            <StyledLink>
                                <div className="table__group__menu__row">
                                    <Icon className="table__group__menu__icon" type="delete" />
                                    <div>Remove Group</div>
                                </div>
                            </StyledLink>
                        </Popconfirm>
                    </Menu.Item>
                    :
                    null
                }
                {this.props.board.groups.length > 1 ? 
                    <Menu.Item>
                        <ReorderGroupDrawer/>
                    </Menu.Item>
                    :
                    null
                }
                <Menu.Item>
                    <StyledLink onClick={() => this.collapseGroup()}>
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
                    </StyledLink>
                </Menu.Item>
            </Menu>
        );
    
        return <tr className="table__header"> 
        <th>
            <Dropdown overlay={menu} disabled={!this.props.allowWrite}>
                <StyledLink>
                    {collapsed ? 
                        <Icon style={{ color: this.groupColor }} className="table__group__menu__icon--main" type="caret-up" />
                    :
                        <Icon style={{ color: this.groupColor }} className="table__group__menu__icon--main" type="caret-down" />
                    }                    
                </StyledLink>
            </Dropdown>
        </th>
        <th
            className="table__header__columns table__header__columns--first"
        >
            <BoardRowHeaderGroupForm
                allowWrite={this.props.allowWrite}
                onUpdateBoard={this.props.onUpdateBoard}
                board={this.props.board}
                groupKey={this.props.groupKey}>
            </BoardRowHeaderGroupForm>
        </th>
        {this.props.board.columns.map((c, idx) => {
            return idx === 0 ? null : <ColumnTh 
                    key={idx} 
                    id={'column'+idx}
                    // className="table__header__columns"
                >
                <Column key={idx}>
                    <BoardRowHeaderForm
                        allowWrite={this.props.allowWrite}
                        onUpdateBoard={this.props.onUpdateBoard}
                        board={this.props.board}
                        colIdx={idx}>
                    </BoardRowHeaderForm>
                    {idx > 0 ? 
                        <BoardColumnMenu columns={this.props.board.columns}/>
                        : null
                    }
                </Column>
            </ColumnTh>
            })}
            <BoardRowHeaderMenu allowWrite={this.props.allowWrite}/>
        </tr>
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      removeColumn: (model) => dispatch(removeColumn(model)),
      collapseGroup: (groupKey) => dispatch(collapseGroup(groupKey)),
      addGroup: () => dispatch(addGroup()),
      removeGroup: (groupId) => dispatch(removeGroup(groupId))
    }
}

export default connect(null, mapDispatchToProps)(BoardRowHeader);