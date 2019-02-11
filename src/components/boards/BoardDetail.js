import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardDetail = (props) => {
    return (<table className="table">
        <thead>
            <BoardRowHeader onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
        </thead>
        <Droppable droppableId={props.board.id}>
            {provided =>(
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {props.board.entities ? props.board.entities.map((r, idx) => (
                    <Draggable key={idx} draggableId={idx.toString()} index={idx}>
                    {provided => (
                        <tr ref={provided.innerRef} {...provided.draggableProps} className="table__rc">                    
                            <BoardRow 
                                key={idx}
                                onUpdateBoard={props.onUpdateBoard}
                                rowIdx={idx}
                                rowId={r.id}
                                board={props.board}
                                provided={provided}
                                >
                            </BoardRow>
                        </tr>
                    )}
                    </Draggable>
                )) : null }
                {provided.placeHolder}
            </tbody>
        )}
        </Droppable>
    </table>)
}

export default BoardDetail;