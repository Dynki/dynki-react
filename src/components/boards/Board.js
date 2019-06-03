import React from 'react';
import { connect } from 'react-redux';
import { debounce, cloneDeep } from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';

import BoardHeader from './BoardHeader';
import BoardDetail from './BoardDetail';

import { updateBoard, newRow, updateColumnValueOrder } from '../../store/actions/boardActions';

// Container for board components.
export class Board extends React.Component {

    constructor(props) {
        super(props);

        // Debounce update methods, to stop spamming persitence logic.
        // The board updates are triggered by user input, specifically the key presses 
        // when editing existing or new row descriptions.
        // The debounce forces the code to wait until 1 second after the last key press, 
        // before it fires the persitence logic. 
        this.onUpdateBoard = debounce(this.onUpdateBoard, 1000);
        this.onNewRow = debounce(this.onNewRow, 1000);

        this.state = {
            groups: []
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            groups: props.board ? props.board.groups : []
        });
    }


    // Triggered by child board detail component. 
    onUpdateBoard = (board) => {
        this.props.updateBoard(board);
    }

    // Triggered by child new row component.
    onNewRow = (description, groupKey) => {
        this.props.newRow(description, groupKey);
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

                console.log('NewBoard Groups!!', newBoard.groups);

                this.setState({ groups: newBoard.groups });
            } else {
                
                // Reorder the rows in the destination group.
                newBoard.groups[destinationGroupIdx].entities = this.reorder(
                    newBoard.groups[destinationGroupIdx].entities,
                    result.source.index,
                    result.destination.index
                );
            }
    
            // console.log('Call Update Board!!', newBoard);
            // console.log('props.board', this.props.board);

            this.onUpdateBoard(newBoard);
        }
    }

    render() {
        return (
            (this.props.board ? 
                <section className="board">
                    <BoardHeader 
                        onUpdateBoard={this.onUpdateBoard}
                        board={this.props.board}>
                    </BoardHeader>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <BoardDetail 
                            onNewRow={this.onNewRow}
                            onUpdateBoard={this.onUpdateBoard}
                            progress={this.props.progress}
                            groups={this.state.groups}
                            board={this.props.board}>
                        </BoardDetail>
                    </DragDropContext>
                </section> 
            : 
                null 
            )
        )
    }
}

export const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard,
      progress: state.base.progress
    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
      updateBoard: (board) => dispatch(updateBoard(board)),
      updateColumnValueOrder: (data) => dispatch(updateColumnValueOrder(data)),
      newRow: (rowObj, groupKey) => dispatch(newRow(rowObj, groupKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);