import React from "react";
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import {
    selectCellValue,
    updateColumn,
    updateColumnValue,
    updateColumnValueColor,
    updateColumnValueStatus,
    addNewColumnValue
} from '../../../../store/actions/boardActions';

import SelectDrawer from "./SelectDrawer";
import SelectCellBtn from "./SelectCellBtn";

class SelectCell extends React.Component {

    defaultState = { editing: false, selectedColorKey: 0, selectedValueKey: undefined, selectedValue: null, selectedColor: null, selectedFgColor: null };

    constructor() {
        super();
        this.state = this.defaultState;
    }

    componentDidMount() {
        this.resetStateModel();
    }

    componentWillReceiveProps() {
        if (!this.props.parentVisible) {
            this.resetStateModel();
        }
    }

    resetStateModel() {
        this.setState(this.defaultState);
        this.selectDefaultColorKey();
    }

    selectDefaultColorKey = () => {
        const colKey = this.props.board.entities[this.props.rowIdx][this.props.col.model];

        this.props.col.values.forEach((v, i) => {
            if (colKey === v.key) {
                this.setState({ selectedColorKey: i, selectedValueKey: v.key, selectedColor: v.color, selectedValue: v, selectedFgColor: (v.fgColor || 'ffffff') });
            }
        });
    }

    onToggleEdit = () => {
        this.props.setVisible(false);
    }

    onSelectOption = (key, model, rowId) => {
        this.props.setVisible(false);

        console.log('OnSelectOption::col', key, model, rowId);
        this.props.selectCellValue(key, model, rowId);
    }

    render() {
        const { col, rowId } = this.props;

        return <div>
            <div className={`select__inner-content`}>
                <div className={`ant-popover-message select select__btnwrapper`}>
                    {col.values.map((c, i) => {
                        return (
                            (c.disabled ?
                                null
                                :
                                <SelectCellBtn
                                    onSelectOption={this.onSelectOption}
                                    key={i}
                                    color={c}
                                    column={col}
                                    rowId={rowId}
                                />
                            )
                        )
                    })}
                </div>
                <SelectDrawer 
                    column={col}
                    rowValue={this.props.rowValue}
                    onToggleEdit={this.onToggleEdit.bind(this)}
                    onUpdateColumn={this.props.updateColumn}
                />
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId) => dispatch(selectCellValue(key, model, rowId)),
        updateColumn: (updatedColumn) => dispatch(updateColumn(updateColumn)),
        updateColumnValue: (valueKey, newTitle, columnModel) => dispatch(updateColumnValue(valueKey, newTitle, columnModel)),
        updateColumnValueColor: (valueKey, newTitle, columnModel, isFgColor) => dispatch(updateColumnValueColor(valueKey, newTitle, columnModel, isFgColor)),
        updateColumnValueStatus: (valueKey, isDisabled, columnModel) => dispatch(updateColumnValueStatus(valueKey, isDisabled, columnModel)),
        addNewColumnValue: (columnModel) => dispatch(addNewColumnValue(columnModel))
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);