/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BoardRowForm from './BoardRowForm';
import { Draggable } from 'react-beautiful-dnd';
import BoardRowMenu from './BoardRowMenu';
import { Tooltip } from 'antd';
import SelectCell from './cellTypes/SelectCell';

class BoardRow extends React.Component {

    constructor(props) {
        super();
        this.state = { hovering: false };
    }

    mouseEnter() {
        this.setState({ hovering: true });
    }

    mouseLeave() {
        this.setState({ hovering: false });
    }

    renderSwitch = (col, idx) => {
        const {...restProps} = this.props;
        switch(col.class) {
            case 'text': 
             return <BoardRowForm
                    onUpdateBoard={this.props.onUpdateBoard}
                    board={this.props.board}
                    rowIdx={this.props.rowIdx}
                    colIdx={idx}
                    modelName={col.model}>
                </BoardRowForm>;

            case 'select':
                return <div className="table__row__cell__container">
                  <SelectCell className="table__header__input text--no-border" {...restProps }></SelectCell>
                </div>
        
            default:
                return null;
        }
    }

    render() {
        return (
            <Draggable draggableId={this.props.rowIdx.toString()} index={this.props.rowIdx}>
                {provided => (
                    <td
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="table__row"
                        onMouseEnter={this.mouseEnter.bind(this)}
                        onMouseLeave={this.mouseLeave.bind(this)}
                    >
                        <div className="row__content">
                            <BoardRowMenu hovering={this.state.hovering} rowIdx={this.props.rowIdx}></BoardRowMenu>
                            <Tooltip title="Drag me">
                                <div
                                    {...provided.dragHandleProps}
                                    className="draghandle"
                                    tabIndex="0">
                                </div>
                            </Tooltip>
                            {this.props.board.columns.map((c, idx) => {
                                return <div key={idx} className={idx === 0 ? "row__content__column--first" : "row__content__column"}>
                                    {this.renderSwitch(c, idx)}
                                </div>
                            })}
                        </div>
                        <section className="row__terminator" tabIndex="-1">
                            <div className="row__terminator__body"></div>
                            <div className="row__terminator__border"></div>
                        </section>
                    </td>
                )}
            </Draggable>
        )
    }
}

export default BoardRow;