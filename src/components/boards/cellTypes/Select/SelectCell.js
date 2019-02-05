import React from "react";
import { Tooltip, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { selectCellValue } from '../../../../store/actions/boardActions';
import SelectCellBtn from "./SelectCellBtn";
import SelectCellForm from "./SelectCellInput";
import SelectColorSwatch from "./SelectColorSwatch";

class SelectCell extends React.Component {

    constructor() {
        super();
        this.state = { visible: false, editing: false };
    }

    onClick = () => {
        this.setState({ visible: true });
    }

    onToggleEdit = () => {
        this.setState({ editing: !this.state.editing });
    }

    selectOption = (key, model, rowId) => {
        this.setVisible(false);
        this.props.selectCellValue(key, model, rowId);
    }

    overlay = () => {
        return (
            <div>
                <div className={`ant-popover-inner-content`}>
                    <div className={`ant-popover-message select`}>
                        {this.props.col.values.map((c, i) => {
                            return (this.state.editing ? 
                                <SelectCellForm key={i} col={c}></SelectCellForm>
                                :
                                <SelectCellBtn key={i} col={c} rowId={this.props.rowId}></SelectCellBtn>)
                        })}
                    </div>
                    <Button onClick={this.onToggleEdit} type="dashed" size="small">
                        <Icon type="edit" theme={this.state.editing ? "filled" : "outlined"}/> Edit Labels
                    </Button>
                    {this.state.editing ? <SelectColorSwatch></SelectColorSwatch> : null}
                </div>
            </div>
        );
    };

    saveTooltip = (node) => {
        this.tooltip = node;
    };

    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }

    onVisibleChange = (visible) => {
        this.setVisible(visible);
    };

    setVisible(visible, e) {
        const props = this.props;
        if (!('visible' in props)) {
            this.setState({ visible });
        }

        const { onVisibleChange } = props;
        if (onVisibleChange) {
            onVisibleChange(visible, e);
        }
    }

    render() {
        const { ...restProps } = this.props;

        const colKey = this.props.board.entities[this.props.rowIdx][this.props.col.model];
        const colObj = this.props.col.values.find(c => c.key === colKey);

        return <Tooltip
            {...restProps}
            visible={this.state.visible}
            prefixCls={"ant-popover"}
            overlay={this.overlay}
            ref={this.saveTooltip}
            onVisibleChange={this.onVisibleChange}
            trigger="click"
            placement="bottom"
        >
            <div className="select-cell select__cell" 
                onClick={this.onClick}
                style={{backgroundColor: `#${colObj ? colObj.color : 'EFF1F3'}`}}
            >
                {colObj ? colObj.title : ''}
            </div>
        </Tooltip>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCellValue: (key, model, rowId) => dispatch(selectCellValue(key, model, rowId))
    }
}


export default connect(null, mapDispatchToProps)(SelectCell);