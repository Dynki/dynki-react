import React from 'react';
import BoardGroup from './BoardGroup';

const BoardDetail = (props) => {

    const {onNewRow, progress, board, groups} = props;

    return (
        <React.Fragment>
            {groups.map((group, groupKey)  => (
                <BoardGroup group={group} groupKey={groupKey} board={board} onNewRow={onNewRow} progress={progress}></BoardGroup>
            ))}
        </React.Fragment>
    )
}

export default BoardDetail;