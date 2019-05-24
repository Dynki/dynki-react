import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { groupBy } from 'lodash';

import BoardNewRow from './BoardNewRow';
import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardDetail = (props) => {

    const grpKeys = Object.keys(props.board.groups);

    return (
        <React.Fragment>
            {grpKeys.map(groupKey => {
                return <React.Fragment>
                    <table className="table" key={groupKey}>
                        <Droppable droppableId={groupKey}>
                        {provided => (
                            <React.Fragment>
                                <thead>
                                    <BoardRowHeader groupKey={groupKey} onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
                                </thead>
                                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                            
                                    {props.board.groups[groupKey].entities && props.board.groups[groupKey].entities.map((r, idx) => (
                                        <Draggable key={idx} draggableId={r.id} index={idx}>
                                        {provided => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} className="table__rc">                    
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
                                    ))} 
                                    {provided.placeHolder}
                                </tbody>
                            </React.Fragment>
                        )}
                        </Droppable>
                    </table>                
                    <BoardNewRow onNewRow={props.onNewRow} progress={props.progress} groupKey={groupKey}></BoardNewRow>
                </React.Fragment>
            })}
        </React.Fragment>
    )
}

export default BoardDetail;