import React from 'react';
import BoardNewRow from './BoardNewRow';
import BoardTable from './BoardTable';

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
        {!group.collapsed ?        
            <React.Fragment>
                <BoardNewRow 
                    allowWrite={allowWrite}
                    group={group} 
                    groupKey={groupKey}
                    onUpdateBoard={onUpdateBoard} 
                    onNewRow={onNewRow} 
                    progress={progress} 
                />
            </React.Fragment>
            : null
        }
    </React.Fragment>)
}

export default BoardGroup;