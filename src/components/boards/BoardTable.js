import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardTable = (props) => {

    const {group, groupKey, progress} = props;

    return (
        <Droppable droppableId={group.id}>
        {(provided, snapshot) => (
            <table className="table" key={groupKey}>
                <React.Fragment>
                    <thead>
                        <BoardRowHeader groupKey={groupKey} onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
                    </thead>
                    <tbody ref={provided.innerRef} {...provided.droppableProps}
                        style={{ paddingBottom: snapshot.isDraggingOver ? '35px': '7px' }}
                    >
                        
                        {!group.collapsed && group.entities ? group.entities.map((r, idx) => (
                            <Draggable key={idx} draggableId={r.id} index={idx}>
                                {provided => (
                                    <tr ref={provided.innerRef} {...provided.draggableProps} className="table__rc"
                                    >                    
                                        <BoardRow 
                                            key={idx}
                                            onUpdateBoard={props.onUpdateBoard}
                                            rowIdx={idx}
                                            rowId={r.id}
                                            board={props.board}
                                            provided={provided}
                                            groupKey={groupKey}
                                            >
                                        </BoardRow>
                                    </tr>
                                )}
                            </Draggable>
                        )) : null}
                        {provided.placeHolder}
                    </tbody>
                </React.Fragment>
        </table>        
        )}
    </Droppable>
    )
}

export default BoardTable;