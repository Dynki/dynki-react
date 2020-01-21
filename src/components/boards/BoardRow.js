/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BoardRowForm from './BoardRowForm';
import BoardRowMenu from './BoardRowMenu';
import { Tooltip, Icon } from 'antd';
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
        const {...restProps} = this.props;

        const rowValue = this.props.board.groups[this.props.groupKey].entities[this.props.rowIdx] 
                        ? this.props.board.groups[this.props.groupKey].entities[this.props.rowIdx][col.model] 
                        : '';

        switch(col.class) {
            case 'text': 
             return <BoardRowForm
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
                    {isFirst ? <BoardRowMenu hovering={this.state.hovering} rowIdx={this.props.rowIdx} groupKey={this.props.groupKey}></BoardRowMenu> : null }
                    {isFirst ?
                                <div
                                    {...this.props.provided.dragHandleProps}
                                    className={this.state.hovering ? "draghandle draghandle--active" : "draghandle"}
                                    style={{ backgroundColor: '#' + this.props.board.groups[this.props.groupKey].color }}
                                    tabIndex="0">
                                    {this.state.hovering ? 
                                        <React.Fragment>
                                            <Tooltip title="Drag me">
                                                <Icon type="more" />
                                            </Tooltip>
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

export default BoardRow;