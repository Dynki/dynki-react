import React from "react";
import { Tooltip } from 'antd';

class SelectCell extends React.Component {

    constructor() {
        super();
        this.state = { visible: false };
    }

    onClick = () => {
        this.setState({ visible: true });
    }

    overlay = () => {
        return (
            <div>
                <div className={`ant-popover-inner-content`}>
                    <div className={`ant-popover-message`}>
                        <div className={`ant-popover-message-title`}>{"Test"}</div>
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
            <div className="select-cell table__header__input text--no-border" onClick={this.onClick}>{this.props.board.entities[this.props.rowIdx][this.props.modelName]}</div>
        </Tooltip>
    }
}

export default SelectCell;