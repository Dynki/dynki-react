import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import BoardHeader from './BoardHeader';
import BoardDetail from './BoardDetail';

import { updateBoard, newRow } from '../../store/actions/boardActions';

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

    render() {
        return (
            (this.props.board ? 
                <section className="board">
                    <BoardHeader 
                        onUpdateBoard={this.onUpdateBoard}
                        board={this.props.board}>
                    </BoardHeader>
                    <BoardDetail 
                        onNewRow={this.onNewRow}
                        onUpdateBoard={this.onUpdateBoard}
                        progress={this.props.progress}
                        groups={this.state.groups}
                        board={this.props.board}>
                    </BoardDetail>
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
      newRow: (rowObj, groupKey) => dispatch(newRow(rowObj, groupKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);