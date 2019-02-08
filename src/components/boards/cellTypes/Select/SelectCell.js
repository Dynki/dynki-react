import React from "react";
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { selectCellValue } from '../../../../store/actions/boardActions';
import SelectCellBtn from "./SelectCellBtn";
import SelectCellForm from "./SelectCellInput";
import SelectColorSwatch from "./SelectColorSwatch";

class SelectCell extends React.Component {

    defaultState = { editing: false, selectedColorKey: 0, selectedColor: null, selectedFgColor: null };

    constructor() {
        super();
        this.state = this.defaultState;
    }

    componentDidMount() {
        this.resetStateModel();
    }

    componentWillReceiveProps() {
        if (this.props.parentVisible) {
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
                this.setState({ selectedColorKey: i });
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
            this.setState({ selectedColorKey: key, selectedColor: col.color });
            console.log('SelectedColor::Set::colorKey', key);
        }
    }

    onColorSelected = (colorHex) => {
        this.setState({ selectedColor: colorHex });
    }

    onFgColorSelected = (colorHex) => {
        this.setState({ selectedFgColor: colorHex });
    }

    render() {
        const { col, rowId } = this.props;

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
                            cellKey={i}
                            key={i}
                            col={c}>
                        </SelectCellForm>
                        :
                        <SelectCellBtn
                            onSelectOption={this.onSelectOption}
                            key={i}
                            color={c}
                            column={col}
                            rowId={rowId}>
                        </SelectCellBtn>)
                })}
            </div>
            {this.state.editing ? 
                <div className="select-swatches">
                    <SelectColorSwatch 
                        selectedColor={this.state.selectedFgColor} 
                        onColorSelected={this.onFgColorSelected}
                        title="Color">
                    </SelectColorSwatch>
                    <SelectColorSwatch 
                        selectedColor={this.state.selectedColor} 
                        onColorSelected={this.onColorSelected}
                        title="Background">
                    </SelectColorSwatch>
                </div>
                : 
                null
            }
            <Button onClick={this.onToggleEdit} type="dashed" size="small">
                <Icon type="edit" theme={this.state.editing ? "filled" : "outlined"}/> Edit Labels
            </Button>
        </div>
    </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId) => dispatch(selectCellValue(key, model, rowId))
    }
}

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectCell);