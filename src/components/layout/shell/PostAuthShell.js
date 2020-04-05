import * as React from 'react';
import { connect } from 'react-redux';
import { SideNav, Toolbar } from '..';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { signOut } from '../../../store/actions/authActions';
import { getBoard } from '../../../store/actions/boardActions';
import { getTeams } from '../../../store/actions/teamActions';
import { updateBoard, updateColumnValueOrder, updateColumnOrder, updateGroupOrder } from '../../../store/actions/boardActions';

import Board from '../../boards/Board';
import EmptyBoards from '../../boards/EmptyBoards';
import Teams from '../../teams/teams';
import TeamAccept from '../../teams/TeamAccept';
import AccountOverview from '../../auth/user/AccountOverview';

const StyledSideNav = styled.div`
    grid-area: sidenav;

    @media all and (min-device-width : 0px) and (max-device-width : 680px) {
        display: none;
    }
`;

class PostAuthShell extends React.Component {

    componentWillMount() {
        this.props.getTeams();

        if (this.props.inviteData.inviteId) {
            this.props.history.push(`/invite/${this.props.inviteData.inviteId}`);
        }
    }

    onDispatchBoardAction(id) {
        this.props.getBoard(id);
    }

    // Triggered by child board detail component. 
    onUpdateBoard = (board) => {
        this.props.updateBoard(board);
    }
    
    // Helper function for drag drop reordering or board rows.
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };
    
    // Triggered when drag of board row have ended.
    // Reorders the entities (rows) within the board and calls logic to persist result.
    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        console.log('result', result);
        if (result.type === 'reorder-column') {
            console.log('Cell recordered');
            this.props.updateColumnOrder(result);
            return;
        }

        if (result.type === 'reorder-group') {
            console.log('Group recordered');
            this.props.updateGroupOrder(result);
            return;
        }

        if (result.draggableId.indexOf('value') > -1) {
            this.props.updateColumnValueOrder(result);
        } else {
            // Row drag end.

            const newBoard = this.props.board;
            const sourceGroupIdx = newBoard.groups.findIndex(grp => grp.id === result.source.droppableId);
            const destinationGroupIdx = newBoard.groups.findIndex(grp => grp.id === result.destination.droppableId);

            // result.desination/source.draggableId = The group id.
            // If they are different then we need to move the row to the new group.

             if (sourceGroupIdx !== destinationGroupIdx) {
                // Get the existing row from the old group.
                const existingRow = newBoard.groups[sourceGroupIdx].entities.find(e => e.id === result.draggableId);

                 newBoard.groups[sourceGroupIdx].entities.splice(result.source.index, 1);

                 // Create a blank array if group has never had any entities.
                if (!newBoard.groups[destinationGroupIdx].entities) {
                    newBoard.groups[destinationGroupIdx].entities = [];
                }

                 // Push the row onto the destination group.
                newBoard.groups[destinationGroupIdx].entities.splice(result.destination.index, 0, existingRow);

                this.setState({ groups: newBoard.groups });
            } else {

                 // Reorder the rows in the destination group.
                newBoard.groups[destinationGroupIdx].entities = this.reorder(
                    newBoard.groups[destinationGroupIdx].entities,
                    result.source.index,
                    result.destination.index
                );
            }
             this.onUpdateBoard(newBoard);
        }
    }

    render() {
        const { boards, boardsChecked, currentUser, domain, firstLoad, inviteData, location, noBoards, progress, signOut } = this.props;

        if (domain.domainId) {
            return <div className="post-auth__content">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Toolbar progress={progress} domain={domain} currentUser={currentUser} signOut={signOut}/>
                <StyledSideNav>
                    <SideNav hideHome={true}/>
                </StyledSideNav>
                <main>
                    {!inviteData.inviteId && noBoards && boardsChecked && location.pathname !== '/empty-boards' &&
                        <Redirect exact from='/' to={`/empty-boards`}/>
                    }
                    {!inviteData.inviteId && location.pathname.split('/')[1] === 'invite' && boards && boards.length > 0 &&
                        <React.Fragment>
                            {/* {this.onDispatchBoardAction(boards[0].id)} */}
                            <Redirect exact from='/' to={`/board/${boards[0].id}`}/>
                        </React.Fragment>
                    }
                    {location.pathname === '/' && boards && boards.length > 0 &&
                        <React.Fragment>
                            {/* {this.onDispatchBoardAction(boards[0].id)} */}
                            <Redirect exact from='/' to={`/board/${boards[0].id}`}/>
                        </React.Fragment>
                    }
                    {location.pathname === '/empty-boards' && boards && boards.length > 0 &&
                        <React.Fragment>
                            {/* {this.onDispatchBoardAction(boards[0].id)} */}
                            <Redirect exact from='/empty-boards' to={`/board/${boards[0].id}`}/>
                        </React.Fragment>
                    }
                    {!inviteData.inviteId && !firstLoad && location.pathname === '/empty-boards' && !noBoards && boards && boards.length > 0 &&
                        <Redirect exact from='/empty-boards' to={`/board/${boards[0].id}`}/>
                    }
                    <Switch>
                        <Route path={'/board/:id'} component={Board}></Route>
                        <Route path={'/team/:id'} component={Teams}></Route>
                        <Route path={'/account'} component={AccountOverview}></Route>
                        <Route path={'/empty-boards'} component={EmptyBoards}></Route>
                        <Route path={'/invite/:inviteId'} component={TeamAccept}></Route>
                    </Switch>
                </main>
            </DragDropContext>
            </div>
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard,
        boards: state.boards.boards,
        boardsChecked: state.boards.boardsChecked,
        currentUser: state.auth.currentUser,
        domain: state.domain,
        firstLoad: state.boards.firstLoad,
        inviteData: state.base.inviteData,
        noBoards: state.boards.noBoards,
        progress: state.base.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (id) => dispatch(getBoard(id)),
        getTeams: () => dispatch(getTeams()),
        updateBoard: (board) => dispatch(updateBoard(board)),
        updateColumnValueOrder: (data) => dispatch(updateColumnValueOrder(data)),
        updateColumnOrder: (data) => dispatch(updateColumnOrder(data)),
        updateGroupOrder: (data) => dispatch(updateGroupOrder(data)),
        signOut: () => dispatch(signOut())
      }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAuthShell));