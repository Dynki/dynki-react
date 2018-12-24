import React from 'react';
import { Icon } from 'antd';
import BoardRowHeaderForm from './BoardRowHeaderForm';

const BoardRowHeader = (props) => {
    return (
        <form className="table__header__columns">
            {props.board.columns.map((c, idx) => {
                return idx === 0 ? (
                    <div className="table__header__columns__container--first">
                        <BoardRowHeaderForm onUpdateBoard={props.onUpdateBoard} board={props.board} colIdx={idx}></BoardRowHeaderForm>
                    </div>
                ) : (
                    <div className="table__header__columns__container">
                        <Icon type="close-square" />
                        <BoardRowHeaderForm onUpdateBoard={props.onUpdateBoard} board={props.board} colIdx={idx}></BoardRowHeaderForm>
                    </div>
                )
            })
            }
        </form>
    )
}

export default BoardRowHeader;