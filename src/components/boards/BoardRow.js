import React from 'react';
import BoardRowForm from './BoardRowForm';
import { Draggable } from 'react-beautiful-dnd';

const BoardRow = (props) => {
    console.log('BoardRowProps::', {props});
    return (
        <Draggable draggableId={props.rowIdx.toString()} index={props.rowIdx}>
            {provided => (
                <td 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="table__row"
                >
                    <div className="row__content">
                        <div className="draghandle" tabIndex="0"></div>
                        {props.board.columns.map((c, idx) => {
                            return idx === 0 ? (
                                <div key={idx}  className="row__content__column--first">
                                    <BoardRowForm 
                                        onUpdateBoard={props.onUpdateBoard}
                                        board={props.board}
                                        rowIdx={props.rowIdx}
                                        modelName={c.model}>
                                    </BoardRowForm>
                                </div>
                            ) : (
                                <div key={idx} className="row__content__column">
                                    <BoardRowForm
                                        onUpdateBoard={props.onUpdateBoard}
                                        board={props.board}
                                        rowIdx={props.rowIdx}
                                        modelName={c.model}>
                                    </BoardRowForm>
                                </div>
                            )
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

export default BoardRow;