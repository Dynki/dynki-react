import React from "react";
import { Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import { selectCellValue } from '../../../store/actions/boardActions';

class SelectCell extends React.Component {

    constructor() {
        super();
        this.state = { visible: false };
    }

    onClick = () => {
        this.setState({ visible: true });
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
                            return <Button 
                                key={i}
                                className="select__option"
                                style={{backgroundColor: `#${c.color}`}}
                                onClick={() => this.selectOption(c.key, this.props.col.model, this.props.rowId)}
                            >
                                {c.title}
                            </Button>
                        })}
                    </div>
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

        // console.log('this.props.rowIdx::', this.props.rowIdx);
        // console.log('this.props.modelName::', this.props.col.model);
        // console.log('this.props.board::', this.props.board);
        // console.log('colKey::', colKey);

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