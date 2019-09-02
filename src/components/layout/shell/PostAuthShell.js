import * as React from 'react';
import { connect } from 'react-redux';
import { Toolbar, SideNav } from '..';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import Board from '../../boards/Board';
import EmptyBoards from '../../boards/EmptyBoards';
import { getBoard } from '../../../store/actions/boardActions';
import { updateBoard, updateColumnValueOrder } from '../../../store/actions/boardActions';

class PostAuthShell extends React.Component {

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
        const { firstLoad, board, boards, noBoards, boardsChecked, location } = this.props;

        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Toolbar progress={this.props.progress}></Toolbar>
                <SideNav domainName={this.props.domain.displayName}></SideNav>
                <main>
                    {noBoards && boardsChecked &&
                        <Redirect exact from='/' to={`/empty-boards`}/>
                    }
                    {location.pathname === '/' && boards && boards.length > 0 &&
                        <React.Fragment>
                            {this.onDispatchBoardAction(boards[0].id)}
                            <Redirect exact from='/' to={`/board`}/>
                        </React.Fragment>
                    }
                    {location.pathname === '/board' && !board && boards.length > 0 &&
                        <React.Fragment>
                            {this.onDispatchBoardAction(boards[0].id)}
                            <Redirect exact from='/' to={`/board`}/>
                        </React.Fragment>
                    }
                    {!firstLoad && location.pathname === '/empty-boards' && !noBoards && boards && boards.length > 0 &&
                        <Redirect exact from='/empty-boards' to={`/board`}/>
                    }
                    <Switch>
                        <Route path={'/board'} component={Board}></Route>
                        <Route path={'/empty-boards'} component={EmptyBoards}></Route>
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
        domain: state.domain,
        progress: state.base.progress,
        boards: state.boards.boards,
        board: state.boards.currentBoard,
        noBoards: state.boards.noBoards,
        firstLoad: state.boards.firstLoad,
        boardsChecked: state.boards.boardsChecked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (id) => dispatch(getBoard(id)),
        updateBoard: (board) => dispatch(updateBoard(board)),
        updateColumnValueOrder: (data) => dispatch(updateColumnValueOrder(data)),
      }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAuthShell));