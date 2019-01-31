import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route, withRouter } from 'react-router-dom';
import Board from '../../boards/Board';

class PostAuthShell extends React.Component {

    render() {
        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
                <Toolbar progress={this.props.progress}></Toolbar>
                <SideNav domainName="Dynki Team"></SideNav>
                <main>
                    <Route exact path={'/board/:id'} component={Board}></Route>
                </main>
            </div>
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domain,
        progress: state.base.progress
    }
}

export default withRouter(connect(mapStateToProps)(PostAuthShell));