/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Tooltip, Icon } from 'antd';

import BoardRowForm from './BoardRowForm';
import BoardRowMenu from './BoardRowMenu';
import { selectRow } from '../../store/actions/boardActions';
import SelectCellModal from './cellTypes/Select/SelectCellModal';
import DateCell from './cellTypes/Date/DateCell';
import DateDueCell from './cellTypes/Date/DateDueCell';

class BoardRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hovering: false };
    }

    mouseEnter() {
        this.setState({ hovering: true });
    }

    mouseLeave() {
        this.setState({ hovering: false });
    }

    setHoverState = (state) => {
        this.setState({ hovering: state });
    }

    renderSwitch = (col, idx) => {
        const {allowWrite, ...restProps} = this.props;

        const rowValue = this.props.board.groups[this.props.groupKey].entities[this.props.rowIdx] 
                        ? this.props.board.groups[this.props.groupKey].entities[this.props.rowIdx][col.model] 
                        : '';

        switch(col.class) {
            case 'text': 
             return <BoardRowForm
                    allowWrite={allowWrite}
                    onUpdateBoard={this.props.onUpdateBoard}
                    board={this.props.board}
                    rowIdx={this.props.rowIdx}
                    rowId={this.props.rowId}
                    colIdx={idx}
                    modelName={col.model}
                    groupKey={this.props.groupKey}
                    progress={this.props.progress}>
                </BoardRowForm>;

            case 'date': 
            return <DateCell
                allowWrite={allowWrite}
                onUpdateBoard={this.props.onUpdateBoard}
                board={this.props.board}
                rowIdx={this.props.rowIdx}
                rowId={this.props.rowId}
                colIdx={idx}
                modelName={col.model}
                groupKey={this.props.groupKey}
                setHoverState={this.setHoverState}
                >
            </DateCell>;
            case 'datedue': 
            return <DateDueCell
                allowWrite={allowWrite}
                onUpdateBoard={this.props.onUpdateBoard}
                board={this.props.board}
                rowIdx={this.props.rowIdx}
                rowId={this.props.rowId}
                colIdx={idx}
                modelName={col.model}
                groupKey={this.props.groupKey}
                setHoverState={this.setHoverState}
                >
            </DateDueCell>;

            case 'select':
                return <div className="table__row__cell__container--nopadding">
                    <SelectCellModal 
                        allowWrite={allowWrite}
                        col={col}
                        rowId={this.props.rowId}
                        rowValue={rowValue}
                        groupKey={this.props.groupKey}
                        {...restProps }/>
                </div>
        
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                {this.props.board.columns.map((c, idx) => {
                    const isFirst = idx === 0;

                    return <td
                        key={idx}
                        className={isFirst ? "table__column table__column--first" : "table__column"}
                        onMouseEnter={this.mouseEnter.bind(this)}
                        onMouseLeave={this.mouseLeave.bind(this)}
                    >
                    {isFirst ? <BoardRowMenu allowWrite={this.props.allowWrite} hovering={this.state.hovering} rowIdx={this.props.rowIdx} groupKey={this.props.groupKey}></BoardRowMenu> : null }
                    {isFirst ?
                                <div
                                    {...this.props.provided.dragHandleProps}
                                    className={this.state.hovering || this.props.selectedRows.includes(this.props.rowId) ? "draghandle draghandle--active" : "draghandle"}
                                    style={{ backgroundColor: '#' + this.props.board.groups[this.props.groupKey].color }}
                                    tabIndex="0">
                                    {this.state.hovering || this.props.selectedRows.includes(this.props.rowId) ? 
                                        <React.Fragment>
                                            <Tooltip title="Drag me">
                                                <Icon type="more" />
                                            </Tooltip>
                                            <Checkbox 
                                                checked={this.props.selectedRows.includes(this.props.rowId)}
                                                onChange={() => this.props.selectRow(this.props.rowId)}
                                            />
                                        </React.Fragment>
                                        :
                                        null
                                    }
                                </div>
                    : null }
                    {this.renderSwitch(c, idx)}
                </td>
            })}
            <td>
                <div className="row__terminator" tabIndex="-1">
                    <div className="row__terminator__body"></div>
                    <div className="row__terminator__border"></div>
                </div>
            </td>
            </>
        )
    }
}

export const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard,
      selectedRows: state.boards.selectedRows
    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
      selectRow: rowId => dispatch(selectRow(rowId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardRow);
