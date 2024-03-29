import React from "react";
import { connect } from 'react-redux';
import { chunk } from 'lodash';
import { Carousel } from 'antd';

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
        this.props.selectCellValue(key, model, rowId, this.props.groupKey);
    }

    render() {
        const { col, rowId } = this.props;

        const contentClass = col.values && col.values.length === 2 ? 'select__inner-content--two' : 'select__inner-content'; 
 
        return (
        <div>
            <div className={contentClass}>
                <div className={`ant-popover-message select`}>
                    <Carousel>
                        {chunk(col.values, 4).map((valChunk, idx) => {
                            return (
                                <div className="select__btnwrapper" key={idx}>
                                    {valChunk.map((c, i) => {
                                        return (
                                            (c.disabled ?
                                                null
                                                :
                                                <SelectCellBtn
                                                    allowWrite={this.props.allowWrite}
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
                            )
                        })}
                    </Carousel>
                </div>
                <SelectDrawer 
                    allowWrite={this.props.allowWrite}
                    column={col}
                    rowValue={this.props.rowValue}
                    onToggleEdit={this.onToggleEdit.bind(this)}
                    onUpdateColumn={this.props.updateColumn}
                    onAddNewColumnValue={this.props.addNewColumnValue}
                />
            </div>
        </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);