import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Board from '../../boards/Board';
import EmptyBoards from '../../boards/EmptyBoards';
import { getBoard } from '../../../store/actions/boardActions';

class PostAuthShell extends React.Component {

    onDispatchBoardAction(id) {
        this.props.getBoard(id);
    }

    render() {
        const { firstLoad, boards, noBoards, boardsChecked, location } = this.props;

        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
                <Toolbar progress={this.props.progress}></Toolbar>
                <SideNav domainName={this.props.domain.displayName}></SideNav>
                <main>
                    <Switch>
                        {firstLoad && noBoards ?
                            (boardsChecked ? 
                                <Redirect exact from='/' to={`/empty-boards`}/>
                                :
                                null
                            )
                            :
                            <Redirect exact from='/' to={`/board/${boards[0].id}`}/>
                        }
                        {!firstLoad && location.pathname === '/empty-boards' && !noBoards ? 
                            <Redirect exact from='/empty-boards' to={`/board/${boards[0].id}`}/>
                            :
                            null
                        }
                        <Route path={'/board/:id'} component={Board}></Route>
                        <Route path={'/empty-boards'} component={EmptyBoards}></Route>
                    </Switch>
                    {firstLoad && boards && boards.length > 0 ?
                        this.onDispatchBoardAction(boards[0].id)
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
        noBoards: state.boards.noBoards,
        firstLoad: state.boards.firstLoad,
        boardsChecked: state.boards.boardsChecked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (id) => dispatch(getBoard(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAuthShell));