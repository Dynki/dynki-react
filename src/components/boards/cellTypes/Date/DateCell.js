import React from "react";
import { connect } from 'react-redux';
import { chunk } from 'lodash';
import { DatePicker } from 'antd';

import {
    selectCellValue,
    updateColumn,
    addNewColumnValue
} from '../../../../store/actions/boardActions';


class DateCell extends React.Component {


    render() {
        const { col, rowId } = this.props;

        return (
            <div className="date-cell">
                <DatePicker size="large" />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId, groupKey) => dispatch(selectCellValue(key, model, rowId, groupKey)),
        updateColumn: (updatedColumn) => dispatch(updateColumn(updatedColumn)),
        addNewColumnValue: (columnModel) => dispatch(addNewColumnValue(columnModel))
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateCell);