import React from "react";
import { Button, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import {
    selectCellValue,
    updateColumnValue,
    updateColumnValueColor,
    updateColumnValueStatus
} from '../../../../store/actions/boardActions';

import SelectCellBtn from "./SelectCellBtn";
import SelectCellForm from "./SelectCellInput";
import SelectColorSwatch from "./SelectColorSwatch";

class SelectCell extends React.Component {

    defaultState = { editing: false, selectedColorKey: 0, selectedValueKey: undefined, selectedValue: null, selectedColor: null, selectedFgColor: null };
    fgColors = ['ffffff', '595959', 'EB144C', 'FF6900', 'FCB900', '00D084', '039BE5', '9900EF'];

    constructor() {
        super();
        this.state = this.defaultState;
        this.onTitleChanged = debounce(this.onTitleChanged, 1000);

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
        this.setState({ editing: !this.state.editing });
    }

    onSelectOption = (key, model, rowId) => {
        this.props.setVisible(false);

        console.log('OnSelectOption::col', key, model, rowId);
        this.props.selectCellValue(key, model, rowId);
    }

    onSelectBtn = (key, col) => {
        if (this.state.editing) {
            this.setState({ selectedColorKey: key, selectedValueKey: col.key, selectedColor: col.color, selectedValue: col });
            console.log('SelectedColor::Set::colorKey', key);
        }
    }

    onColorSelected = (colorHex) => {
        this.setState({ selectedColor: colorHex });
        this.props.updateColumnValueColor(this.state.selectedValueKey, colorHex, this.props.col.model, false);
    }

    onFgColorSelected = (colorHex) => {
        this.setState({ selectedFgColor: colorHex });
        this.props.updateColumnValueColor(this.state.selectedValueKey, colorHex, this.props.col.model, true);
    }

    onTitleChanged = (col, title) => {
        console.log('onTitleChanged::col', col);
        this.props.updateColumnValue(col.key, title, this.props.col.model);
    }

    onColorStatusChange = (enabled) => {
        const selectedValue = this.state.selectedValue;
        selectedValue.disabled = !enabled;
        this.setState({ selectedValue });
        console.log('onColorStatusChange::', this.state.selectedValueKey, !enabled, this.props.col.model);
        this.props.updateColumnValueStatus(this.state.selectedValueKey, !enabled, this.props.col.model);
    }

    render() {
        const { col, rowId } = this.props;

        console.log('SelectCell::Render::state', this.state);

        return <div>
            <div className={`select__inner-content`}>
                <div className={`ant-popover-message select`}>
                    {col.values.map((c, i) => {
                        return (this.state.editing ?
                            <SelectCellForm
                                selectedColor={this.state.selectedColor}
                                selectedFgColor={this.state.selectedFgColor}
                                selectedKey={this.state.selectedColorKey}
                                onSelected={this.onSelectBtn}
                                onTitleChanged={this.onTitleChanged}
                                cellKey={i}
                                key={i}
                                col={c}>
                            </SelectCellForm>
                            :
                            (c.disabled ?
                                null
                                :
                                <SelectCellBtn
                                    onSelectOption={this.onSelectOption}
                                    key={i}
                                    color={c}
                                    column={col}
                                    rowId={rowId}>
                                </SelectCellBtn>)
                        )
                    })}
                </div>
                {this.state.editing ?
                    <div>
                        <Button className="select__newbtn" onClick={this.onToggleEdit} type="dashed" size="small">
                            <Icon type="plus" />New Label
                    </Button>
                        <Switch
                            className="select__switch"
                            checkedChildren="enabled"
                            unCheckedChildren="disabled"
                            defaultChecked
                            checked={!this.state.selectedValue.disabled}
                            onClick={this.onColorStatusChange}
                        />
                        <div className="select-swatches">
                            <SelectColorSwatch
                                selectedColor={this.state.selectedFgColor}
                                onColorSelected={this.onFgColorSelected}
                                title="Color"
                                colors={this.fgColors}
                            >
                            </SelectColorSwatch>
                            <SelectColorSwatch
                                selectedColor={this.state.selectedColor}
                                onColorSelected={this.onColorSelected}
                                title="Background">
                            </SelectColorSwatch>
                        </div>
                    </div>
                    :
                    null
                }
                <Button onClick={this.onToggleEdit} type="dashed" size="small">
                    <Icon type="edit" theme={this.state.editing ? "filled" : "outlined"} /> Edit Labels
            </Button>
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId) => dispatch(selectCellValue(key, model, rowId)),
        updateColumnValue: (valueKey, newTitle, columnModel) => dispatch(updateColumnValue(valueKey, newTitle, columnModel)),
        updateColumnValueColor: (valueKey, newTitle, columnModel, isFgColor) => dispatch(updateColumnValueColor(valueKey, newTitle, columnModel, isFgColor)),
        updateColumnValueStatus: (valueKey, isDisabled, columnModel) => dispatch(updateColumnValueStatus(valueKey, isDisabled, columnModel))
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boards.currentBoard
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);