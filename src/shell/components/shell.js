import * as React from 'react';
import Toolbar from './Toolbar';

class Shell extends React.Component {
    render() {
        console.log('Shell::Component::Render')
        return <div className="post-auth__content">
            <Toolbar></Toolbar>
        </div>
    }
}

export default Shell;