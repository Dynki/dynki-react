import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { groupBy } from 'lodash';

import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardDetail = (props) => {

    const groups = groupBy(props.board.entities, 'group');
    const grpKeys = Object.keys(groups);

    console.log(groups);

    return (
        <React.Fragment>
            {props.board.entities ? grpKeys.map(key => {
                return <table className="table">
                    <Droppable droppableId={props.board.id}>
                    {provided => (
                        <React.Fragment>
                            <thead>
                                <BoardRowHeader onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
                            </thead>
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        
                                {groups[key].map((r, idx) => (
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
                                ))} 
                                {provided.placeHolder}
                            </tbody>

                        </React.Fragment>
                    )}
                    </Droppable>
                </table>                
            }): null}
        </React.Fragment>
    )
}

export default BoardDetail;