import React from 'react';
import { Icon, Button } from 'antd';

const EmptyBoards = (props) => {
    return (
        <div className="board__empty">
            <img alt="welcome robot" src="/assets/img/robot.PNG"/>
            <div className="explain">Uh oh, no boards yet??</div>
            <Button size="large" type="primary">Let's Get Started</Button>
        </div>
    )
}

export default EmptyBoards;