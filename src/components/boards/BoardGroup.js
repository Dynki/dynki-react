import React from 'react';
import BoardNewRow from './BoardNewRow';
import BoardTable from './BoardTable';
import BoardGroupSummary from './BoardGroupSummary';

const BoardGroup = (props) => {

    const {allowWrite, board, group, groupKey, onNewRow, progress, onUpdateBoard} = props;

    return (
    <React.Fragment key={group.id}>
        <BoardTable 
            allowWrite={allowWrite}
            board={board} 
            group={group} 
            groupKey={groupKey} 
            onUpdateBoard={onUpdateBoard} 
            progress={progress}
        />
        <BoardGroupSummary
            board={board} 
            group={group} 
            groupKey={groupKey} 
        />
        {!group.collapsed ?        
            <BoardNewRow 
                allowWrite={allowWrite}
                group={group} 
                groupKey={groupKey}
                onUpdateBoard={onUpdateBoard} 
                onNewRow={onNewRow} 
                progress={progress} 
            />
            : null
        }
    </React.Fragment>)
}

export default BoardGroup;