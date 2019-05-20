import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
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
    }

    // Triggered by child board detail component. 
    onUpdateBoard = (board) => {
        this.props.updateBoard(board);
    }

    // Triggered by child new row component.
    onNewRow = (description) => {
        this.props.newRow(description);
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
        console.log('Drag Finished', result);

        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        if (result.draggableId.indexOf('value') > -1) {
            this.props.updateColumnValueOrder(result);
        } else {
            const newBoard = this.props.board;
            newBoard.entities = this.reorder(
                newBoard.entities,
                result.source.index,
                result.destination.index
            );
    
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
                            progress={this.progress}
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
      newRow: (rowObj) => dispatch(newRow(rowObj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);