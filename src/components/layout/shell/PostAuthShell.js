import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route, withRouter, Switch } from 'react-router-dom';
import Board from '../../boards/Board';
import NotFoundComponent from '../../core/NotFoundComponent';

class PostAuthShell extends React.Component {

    render() {
        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
                <Toolbar progress={this.props.progress}></Toolbar>
                <SideNav domainName="Dynki Team"></SideNav>
                <main>
                    <Switch>
                        <Route exact path={'/board/:id'} component={Board}></Route>
                        <Route path="*" component={NotFoundComponent} />
                    </Switch>
                </main>
            </div>
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domain,
        progress: state.base.progress,
        boards: state.boards.boards
    }
}

export default withRouter(connect(mapStateToProps)(PostAuthShell));