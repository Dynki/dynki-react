import React from 'react';
import { connect } from 'react-redux';
import { Card, Statistic, Tag } from 'antd';
import { debounce } from 'lodash';
import { Detector } from "react-detect-offline";
import styles from 'styled-components';

import authWrapper from '../auth/AuthWrapper';
import BoardHeader from './BoardHeader';
import BoardDetail from './BoardDetail';

import { getBoard, getBoards, updateBoard, moveToGroup, newRow, clearSelectedRows, deleteSelectedRows } from '../../store/actions/boardActions';
import BoardSelections from './BoardSelections';

const StyledTag = styles(Tag)`
    margin: 10px;
`;

// Container for board components.
export class Board extends React.Component {

    constructor(props) {
        super(props);

        // Debounce update methods, to stop spamming persitence logic.
        // The board updates are triggered by user input, specifically the key presses 
        // when editing existing or new row descriptions.
        // The debounce forces the code to wait until 1 second after the last key press, 
        // before it fires the persitence logic. 
        this.onUpdateBoard = debounce(this.onUpdateBoard, 100);
        this.onNewRow = debounce(this.onNewRow, 1000);

        this.state = {
            groups: []
        }
    }

    componentDidMount = () => {
        if (!this.props.board) {

            if (this.props.boards && this.props.boards.length > 0) {
                this.props.getBoard(this.props.boards[0].id);
            } else {
                this.props.getBoards(true);
            }
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

    onConnectionStatusChanged = (online) => {
        if (online) {
            this.props.getBoard(this.props.board.id);
        }
    }
    
    checkWritePermission = () => {
        const { board, hasRole } = this.props;
        let allowWrite = false;

        if (board && board.roles && board.roles.write && board.roles.write.length > 0) {
            let writeRoles = board.roles.write;

            writeRoles.map(role => {
                if (hasRole(role)) {
                    allowWrite = true;
                }

                return role;
            });
        } else {
            allowWrite = true;
        }

        return allowWrite;
    }

    render() {
        const { board, progress, selectedRows } = this.props;
        let allowWrite = true;

        if (board) {
            allowWrite = this.checkWritePermission();
        }

        return (
            <Detector
                onChange={this.onConnectionStatusChanged}
                polling={false}
                render={({ online }) => (
                    board ?
                    <React.Fragment>
                        <section className="board">
                            <BoardHeader 
                                onUpdateBoard={this.onUpdateBoard}
                                board={board}
                                allowWrite={allowWrite}
                                />
                            <BoardDetail 
                                onNewRow={this.onNewRow}
                                onUpdateBoard={this.onUpdateBoard}
                                progress={progress}
                                groups={this.state.groups}
                                board={board}
                                allowWrite={allowWrite}
                            />
                            {!allowWrite ? <StyledTag color="magenta">Read Only</StyledTag> : null}
                        </section> 
                        {selectedRows.length > 0 &&
                            <BoardSelections 
                                selectedRows={selectedRows} 
                                onDeselect={this.props.clearSelectedRows} 
                                groups={this.props.board.groups}
                                onMoveGroup={this.props.moveToGroup}
                                onDelete={this.props.deleteSelectedRows}
                            />
                        }
                    </React.Fragment>
                :
                    null
                )}
            />
        )
    }
}

export const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard,
      boards: state.boards.boards,
      progress: state.base.progress,
      selectedRows: state.boards.selectedRows
    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
      getBoard: (id) => dispatch(getBoard(id)),
      getBoards: (loadFirst) => dispatch(getBoards(loadFirst)),
      updateBoard: (board) => dispatch(updateBoard(board)),
      newRow: (rowObj, groupKey) => dispatch(newRow(rowObj, groupKey)),
      clearSelectedRows: () => dispatch(clearSelectedRows()),
      moveToGroup: groupId => dispatch(moveToGroup(groupId)),
      deleteSelectedRows: () => dispatch(deleteSelectedRows())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(authWrapper(Board));