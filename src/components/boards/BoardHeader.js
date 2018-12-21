import React from 'react';
import BoardForm from './BoardForm';

class BoardHeader extends React.Component {
    render() {
        return (
            <section className="board__header">
                <BoardForm onUpdateBoard={this.props.onUpdateBoard} board={this.props.board}></BoardForm>
            </section>
        )
    }
}

export default BoardHeader;