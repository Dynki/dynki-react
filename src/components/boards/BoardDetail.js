import React from 'react';
import BoardRowHeader from './BoardRowHeader';

const BoardDetail = (props) => {
    return (
        <section className="table">
            <BoardRowHeader onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
            {/* <BoardRow rows={props.rows}></BoardRow>
            <BoardNewRow></BoardNewRow>             */}
        </section>
    )
}

export default BoardDetail;