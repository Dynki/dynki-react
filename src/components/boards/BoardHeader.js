import React from 'react';
import BoardForm from './BoardForm';
class BoardHeader extends React.Component {
    render() {
        return (
            <section className="board__header">
                <BoardForm></BoardForm>
            </section>
        )
    }
}

export default BoardHeader;