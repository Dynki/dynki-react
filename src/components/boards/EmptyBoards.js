import React from 'react';
import { connect } from 'react-redux';
import { Button, Empty } from 'antd';

import { newBoard } from '../../store/actions/boardActions';

class EmptyBoards extends React.Component {
    render() {
        return (
        <div className="board__empty">
            <Empty
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                imageStyle={{
                height: 260,
                }}
                description={
                <span>
                    Oh no you have no boards to play with!
                </span>
                }
            >
                <Button onClick={this.props.newBoard} size="large" type="primary">Let's Get Started</Button>
            </Empty>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newBoard: () => dispatch(newBoard())
    }
}

export default connect(undefined, mapDispatchToProps)(EmptyBoards);