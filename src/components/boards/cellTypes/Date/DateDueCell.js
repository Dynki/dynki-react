import React from "react";
import { connect } from 'react-redux';
import DateDueForm from './DateDueForm';

import { updateBoard } from '../../../../store/actions/boardActions';

class DateDueCell extends React.Component {

    onUpdateBoard = (updatedBoard) => {
        this.props.updateBoard(updatedBoard);
    }

    render() {
        return (
            <div className="date-due-cell">
                <DateDueForm {...this.props} onUpdateBoard={this.onUpdateBoard}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBoard: (board) => dispatch(updateBoard(board))
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateDueCell);