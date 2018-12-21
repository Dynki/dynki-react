import React from 'react';
import BoardHeader from './BoardHeader';

class Board extends React.Component {
    render() {
        return (
            <section className="board">
                <BoardHeader></BoardHeader>
            </section>
        )
    }
}

export default Board;