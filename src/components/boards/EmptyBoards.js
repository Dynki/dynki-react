import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { newBoard } from '../../store/actions/boardActions';

class EmptyBoards extends React.Component {
    render() {
        return (
            <div className="board__empty">
                <img alt="welcome robot" src="/assets/img/robot.PNG"/>
                <div className="explain">Uh oh, no boards yet??</div>
                <Button onClick={this.props.newBoard} size="large" type="primary">Let's Get Started</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newBoard: () => dispatch(newBoard())
    }
}

export default connect(undefined, mapDispatchToProps)(EmptyBoards);