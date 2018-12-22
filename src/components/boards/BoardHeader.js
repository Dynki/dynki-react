import React from 'react';
import BoardForm from './BoardForm';

const BoardHeader = (props) => {
    return (
        <section className="board__header">
            <BoardForm onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardForm>
        </section>
    )
}

export default BoardHeader;