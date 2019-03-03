import React, { useState } from 'react';
import { Drawer, Button, Icon, Switch } from 'antd';
import SelectCellForm from './SelectCellInput';
import SelectColorSwatch from './SelectColorSwatch';

const SelectDrawer = (props) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        props.onToggleEdit();
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <Button onClick={showDrawer} type="dashed" size="small">
                <Icon type="edit"/> Edit Labels
            </Button>

            <Drawer
                title="Edit Labels"
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}
            >
                <div className="select__drawer-colors">
                    {props.column.values.map((c, i) => {
                        return <SelectCellForm
                            // selectedColor={this.state.selectedColor}
                            // selectedFgColor={this.state.selectedFgColor}
                            // selectedKey={this.state.selectedColorKey}
                            // onSelected={this.onSelectBtn}
                            // onTitleChanged={this.onTitleChanged}
                            cellKey={i}
                            key={i}
                            col={c}>
                        </SelectCellForm>
                    })}
                </div>
                <Button className="select__newbtn"  type="dashed" size="small">
                    <Icon type="plus" />New Label
                </Button>
                <Switch
                    className="select__switch"
                    checkedChildren="enabled"
                    unCheckedChildren="disabled"
                    defaultChecked
                    // checked={this.state.selectedValue && !this.state.selectedValue.disabled}
                    // onClick={this.onColorStatusChange}
                />
                <div className="select-swatches">
                    <SelectColorSwatch
                        // selectedColor={this.state.selectedFgColor}
                        // onColorSelected={this.onFgColorSelected}
                        title="Color"
                        // colors={this.fgColors}
                    >
                    </SelectColorSwatch>
                    <SelectColorSwatch
                        // selectedColor={this.state.selectedColor}
                        // onColorSelected={this.onColorSelected}
                        title="Background">
                    </SelectColorSwatch>
                </div>



            </Drawer>
        </React.Fragment>
    );
}

export default SelectDrawer;