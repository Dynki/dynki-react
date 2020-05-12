import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardTable = (props) => {

    const {allowWrite, group, groupKey, progress} = props;

    return (
        <Droppable droppableId={group.id}>
        {(provided, snapshot) => (
            <table className="table" key={groupKey}>
                <React.Fragment>
                    <thead>
                        <BoardRowHeader allowWrite={allowWrite} groupKey={groupKey} onUpdateBoard={props.onUpdateBoard} board={props.board}/>
                    </thead>
                    <tbody ref={provided.innerRef} {...provided.droppableProps}
                        style={{ paddingBottom: snapshot.isDraggingOver ? '35px': '0px' }}
                    >
                        
                        {!group.collapsed && group.entities ? group.entities.map((r, idx) => (
                            <Draggable isDragDisabled={!allowWrite}  key={r.id} draggableId={r.id} index={idx}>
                                {provided => (
                                    <tr ref={provided.innerRef} {...provided.draggableProps} className="table__rc"
                                    >                    
                                        <BoardRow 
                                            allowWrite={allowWrite}
                                            key={r.id}
                                            onUpdateBoard={props.onUpdateBoard}
                                            rowIdx={idx}
                                            rowId={r.id}
                                            board={props.board}
                                            provided={provided}
                                            groupKey={groupKey}
                                            progress={progress}
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