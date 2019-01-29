import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';

import BoardHeader from './BoardHeader';
import BoardDetail from './BoardDetail';
import BoardNewRow from './BoardNewRow';

import { updateBoard, newRow } from '../../store/actions/boardActions';

// Container for board components.
class Board extends React.Component {

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
        // dropped outside the list
        if (!result.destination) {
            return;
        }
             
        const newBoard = this.props.board;
        newBoard.entities = this.reorder(
            newBoard.entities,
            result.source.index,
            result.destination.index
        );

        this.onUpdateBoard(newBoard);
    }

    render() {
        console.log('Rerendering Board Component');

        return (
            (this.props.board ? 
                <section className="board">
                    <BoardHeader 
                        onUpdateBoard={this.onUpdateBoard}
                        board={this.props.board}>
                    </BoardHeader>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <BoardDetail 
                            onUpdateBoard={this.onUpdateBoard}
                            board={this.props.board}>
                        </BoardDetail>
                    </DragDropContext>
                    <BoardNewRow onNewRow={this.onNewRow}></BoardNewRow>
                </section> : null 
            )
        )
    }
}

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      updateBoard: (board) => dispatch(updateBoard(board)),
      newRow: (description) => dispatch(newRow(description))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);