import React from 'react';
import BoardNewRow from './BoardNewRow';
import BoardTable from './BoardTable';

const BoardGroup = (props) => {

    const {board, group, groupKey, onNewRow, progress} = props;

    return (
    <React.Fragment key={group.id}>
        <BoardTable group={group} groupKey={groupKey} board={board}></BoardTable>
        {group.collapsed ?        
            <BoardNewRow onNewRow={onNewRow} progress={progress} groupKey={groupKey}></BoardNewRow>
            : null
        }
    </React.Fragment>)
}

export default BoardGroup;