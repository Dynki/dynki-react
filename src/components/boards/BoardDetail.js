import React from 'react';

const BoardDetail = (props) => {
    return (
        <section className="table">
            <BoardDetail board={props.board}></BoardDetail>
        </section>
    )
}

export default BoardDetail;