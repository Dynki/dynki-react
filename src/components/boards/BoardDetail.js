import React from 'react';
import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';
import { Droppable } from 'react-beautiful-dnd';

const BoardDetail = (props) => {
    console.log('BoardRow::Props::', props);
    return (
        <table className="table">
            <tbody>
                <tr>
                    <BoardRowHeader onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
                </tr>
                <Droppable droppableId={props.board.id}>
                    {provided =>(
                        <tr 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="table__rc"
                        >                    
                            {props.board.entities ? props.board.entities.map((r, idx) => (
                                <BoardRow 
                                    key={idx}
                                    onUpdateBoard={props.onUpdateBoard}
                                    rowIdx={idx}
                                    board={props.board}>
                                </BoardRow>
                            )) : null }
                            {provided.placeHolder}
                        </tr>

                    )}
                </Droppable>
            </tbody>
            {/* <BoardNewRow></BoardNewRow>              */}
        </table>
    )
}

export default BoardDetail;