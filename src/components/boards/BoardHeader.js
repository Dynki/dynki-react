import React from 'react';
import BoardForm from './BoardForm';
import BoardHeaderMenu from './BoardHeaderMenu';

const BoardHeader = (props) => {
    return (
        <section className="board__header">
            <BoardForm onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardForm>
            <BoardHeaderMenu boardId={props.board.id}></BoardHeaderMenu>
        </section>
    )
}

export default BoardHeader;