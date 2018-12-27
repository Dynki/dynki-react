import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';

import BoardHeader from './BoardHeader';
import BoardDetail from './BoardDetail';
import { updateBoard } from '../../store/actions/boardActions';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.onUpdateBoard = this.onUpdateBoard.bind(this);
        this.onUpdateBoard = debounce(this.onUpdateBoard, 1000)
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onUpdateBoard(board) {
        console.log('BOARD::VAL::', board);
        this.props.updateBoard(board);
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    onDragEnd(result) {
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
      updateBoard: (board) => dispatch(updateBoard(board)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);