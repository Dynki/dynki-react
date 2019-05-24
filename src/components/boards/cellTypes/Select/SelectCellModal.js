import React from "react";
import { Tooltip } from 'antd';
import { connect } from 'react-redux';
import { selectCellValue } from '../../../../store/actions/boardActions';
import SelectCell from './SelectCell';

class SelectCellModal extends React.Component {

    defaultState = { visible: false };

    constructor() {
        super();
        this.state = this.defaultState;
    }

    onClick = () => {
        this.setState({ visible: true });
    }

    overlay = () => {
        return (
            <SelectCell
                rowValue={this.props.rowValue}
                rowIdx={this.props.rowIdx}
                rowId={this.props.rowId}
                col={this.props.col}
                setVisible={this.setVisible.bind(this)}
                parentVisible={this.state.visible}
            />
        )
    };

    saveTooltip = (node) => {
        this.tooltip = node;
    };

    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }

    onVisibleChange = (visible) => {
        this.setVisible(visible);
        // this.resetStateModel();
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

        const idx = this.props.board.group[this.props.groupKey].entities.findIndex(r => this.props.rowId === r.id);

        const colKey = this.props.board.group[this.props.groupKey].entities[idx][this.props.col.model];
        const colObj = this.props.col.values.find(c => c.key === colKey);
        const fgColor = (colObj && colObj.fgColor) ? colObj.fgColor : 'ffffff';

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
                style={{backgroundColor: `#${colObj ? colObj.color : 'EFF1F3'}`, color: `#${fgColor}`}}
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

const mapStateToProps = (state) => {
    return{
      board: state.boards.currentBoard
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectCellModal);