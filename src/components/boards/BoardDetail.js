import React from 'react'
import BoardGroup from './BoardGroup'

const BoardDetail = (props) => {

    const {allowWrite, onNewRow, onUpdateBoard, progress, board, groups} = props;

    return (
        <React.Fragment>
            {groups.map((group, groupKey)  => 
                <BoardGroup 
                    key={group.id}
                    group={group}
                    groupKey={groupKey}
                    board={board}
                    onNewRow={onNewRow}
                    progress={progress}
                    onUpdateBoard={onUpdateBoard}
                    allowWrite={allowWrite}
                ></BoardGroup>
            )}
        </React.Fragment>
    )
}

export default React.memo(BoardDetail)