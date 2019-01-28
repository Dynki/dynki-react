/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BoardRowForm from './BoardRowForm';
import { Draggable } from 'react-beautiful-dnd';
import BoardRowMenu from './BoardRowMenu';

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
                            <BoardRowMenu hovering={this.state.hovering}></BoardRowMenu>
                            <div
                                {...provided.dragHandleProps}
                                className="draghandle"
                                tabIndex="0">
                            </div>
                            {this.props.board.columns.map((c, idx) => {
                                return <div key={idx} className={idx === 0 ? "row__content__column--first" : "row__content__column"}>
                                    <BoardRowForm
                                        onUpdateBoard={this.props.onUpdateBoard}
                                        board={this.props.board}
                                        rowIdx={this.props.rowIdx}
                                        modelName={c.model}>
                                    </BoardRowForm>
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