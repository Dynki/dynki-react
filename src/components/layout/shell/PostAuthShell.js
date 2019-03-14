import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Board from '../../boards/Board';
import EmptyBoards from '../../boards/EmptyBoards';
import { getBoard } from '../../../store/actions/boardActions';

class PostAuthShell extends React.Component {

    onDispatchBoardAction(id) {
        console.log('PostAuthShell::OnDispatch::id', id);
        this.props.getBoard(id);
    }

    render() {
        const { firstLoad, boards } = this.props;

        if (this.props.domain.domainId) {
            console.log('PostAuth::DomainIsSet!!!!', this.props);
            return <div className="post-auth__content">
                <Toolbar progress={this.props.progress}></Toolbar>
                <SideNav domainName={this.props.domain.displayName}></SideNav>
                <main>
                    <Switch>
                        {(firstLoad && boards && boards.length > 0) ?
                            (boards.length > 0 ? 
                                <Redirect exact from='/' to={`/board/${this.props.boards[0].id}`}/>
                                :
                                <Redirect exact from='/' to={`/empty-boards`}/>
                            )
                            : null
                        }
                        <Route path={'/board/:id'} component={Board}></Route>
                        <Route path={'/empty-boards'} component={EmptyBoards}></Route>
                    </Switch>
                    {this.props.firstLoad && this.props.boards && this.props.boards.length > 0 ?
                        this.onDispatchBoardAction(this.props.boards[0].id)
                        : null
                    }

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
        boards: state.boards.boards,
        firstLoad: state.boards.firstLoad
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (id) => dispatch(getBoard(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAuthShell));