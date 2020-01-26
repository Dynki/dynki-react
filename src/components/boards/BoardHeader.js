import React from 'react';
import BoardForm from './BoardForm';
import BoardHeaderMenu from './BoardHeaderMenu';

const BoardHeader = ({ allowWrite, board, onUpdateBoard }) => {
    return (
        <section className="board__header">
            <BoardForm allowWrite={allowWrite} onUpdateBoard={onUpdateBoard} board={board}></BoardForm>
            <BoardHeaderMenu allowWrite={allowWrite} boardId={board.id}></BoardHeaderMenu>
        </section>
    )
}

export default BoardHeader;