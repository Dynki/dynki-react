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

        console.log('Drag End::', result);

        // if (result.draggableId.indexOf('value') > -1) {
        //     this.props.updateColumnValueOrder(result);
        // } else {
        //     // Row drag end.

        //     const newBoard = this.props.board;
        //     const sourceGroupIdx = newBoard.groups.findIndex(grp => grp.id === result.source.droppableId);
        //     const destinationGroupIdx = newBoard.groups.findIndex(grp => grp.id === result.destination.droppableId);

        //     // result.desination/source.draggableId = The group id.
        //     // If they are different then we need to move the row to the new group.

        //     if (sourceGroupIdx !== destinationGroupIdx) {
        //         // Get the existing row from the old group.
        //         const existingRow = newBoard.groups[sourceGroupIdx].entities.find(e => e.id === result.draggableId);
                
        //         newBoard.groups[sourceGroupIdx].entities.splice(result.source.index, 1);

        //         // Create a blank array if group has never had any entities.
        //         if (!newBoard.groups[destinationGroupIdx].entities) {
        //             newBoard.groups[destinationGroupIdx].entities = [];
        //         }

        //         // Push the row onto the destination group.
        //         newBoard.groups[destinationGroupIdx].entities.splice(result.destination.index, 0, existingRow);

        //         console.log('NewBoard Groups!!', newBoard.groups);

        //         this.setState({ groups: newBoard.groups });
        //     } else {
                
        //         // Reorder the rows in the destination group.
        //         newBoard.groups[destinationGroupIdx].entities = this.reorder(
        //             newBoard.groups[destinationGroupIdx].entities,
        //             result.source.index,
        //             result.destination.index
        //         );
        //     }
    
        //     // console.log('Call Update Board!!', newBoard);
        //     // console.log('props.board', this.props.board);

        //     this.onUpdateBoard(newBoard);
        // }
    }

    render() {
        const { firstLoad, boards, noBoards, boardsChecked, location } = this.props;

        if (this.props.domain.domainId) {
            return <div className="post-auth__content">
            <DragDropContext onDragEnd={this.onDragEnd}>
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