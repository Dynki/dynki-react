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
    }

    onUpdateBoard(board) {
        console.log('BOARD::VAL::', board);
        this.props.updateBoard(board);
    }

    onDragEnd() {

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