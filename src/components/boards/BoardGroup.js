import React from 'react';
import BoardNewRow from './BoardNewRow';
import BoardTable from './BoardTable';

const BoardGroup = (props) => {

    const {board, group, groupKey, onNewRow, progress, onUpdateBoard} = props;

    return (
    <React.Fragment key={group.id}>
        <BoardTable onUpdateBoard={onUpdateBoard} group={group} groupKey={groupKey} board={board} progress={progress}></BoardTable>
        {!group.collapsed ?        
            <BoardNewRow onUpdateBoard={onUpdateBoard} onNewRow={onNewRow} progress={progress} groupKey={groupKey}></BoardNewRow>
            : null
        }
    </React.Fragment>)
}

export default BoardGroup;