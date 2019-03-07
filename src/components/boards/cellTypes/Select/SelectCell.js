import React from "react";
import { connect } from 'react-redux';

import {
    selectCellValue,
    updateColumn,
    addNewColumnValue
} from '../../../../store/actions/boardActions';

import SelectDrawer from "./SelectDrawer";
import SelectCellBtn from "./SelectCellBtn";

class SelectCell extends React.Component {

    defaultState = { 
        editing: false
    };

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
    }

    onToggleEdit = () => {
        this.props.setVisible(false);
    }

    onSelectOption = (key, model, rowId) => {
        this.props.setVisible(false);
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
                    onAddNewColumnValue={this.props.addNewColumnValue}
                />
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId) => dispatch(selectCellValue(key, model, rowId)),
        updateColumn: (updatedColumn) => dispatch(updateColumn(updatedColumn)),
        addNewColumnValue: (columnModel) => dispatch(addNewColumnValue(columnModel))
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);