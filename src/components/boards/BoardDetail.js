import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import BoardNewRow from './BoardNewRow';
import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';
import newGuid from '../../store/utils/guid';
import BoardGroup from './BoardGroup';

const BoardDetail = (props) => {

    const {onNewRow, progress, board} = props;

    return (
        <React.Fragment>
            {board.groups.map((group, groupKey)  => (
                <BoardGroup group={group} groupKey={groupKey} board={board} onNewRow={onNewRow} progress={progress}></BoardGroup>
            ))}
        </React.Fragment>
    )
}

export default BoardDetail;