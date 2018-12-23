import React from 'react';
import BoardRowHeader from './BoardRowHeader';

const BoardDetail = (props) => {
    return (
        <section className="table">
            <BoardRowHeader columns={props.board.columns}></BoardRowHeader>
            {/* <BoardRow rows={props.rows}></BoardRow>
            <BoardNewRow></BoardNewRow>             */}
        </section>
    )
}

export default BoardDetail;