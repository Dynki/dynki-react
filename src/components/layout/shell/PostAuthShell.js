import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route } from 'react-router-dom';
import Board from '../../boards/Board';

class PostAuthShell extends React.Component {

    render() {
        console.log('PostAuthShell::Render');
        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
                <Toolbar></Toolbar>
                <SideNav domainName="Dynki Team"></SideNav>
                <main>
                    <Route path={'/board/:id'} component={Board}></Route>
                </main>
            </div>
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domain
    }
}

export default connect(mapStateToProps)(PostAuthShell);