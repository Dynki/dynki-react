import React, { useState } from 'react';
import { Drawer, Button, Icon, Switch } from 'antd';
import SelectCellForm from './SelectCellInput';
import SelectColorSwatch from './SelectColorSwatch';

const SelectDrawer = (props) => {

    const fgColors = ['ffffff', '595959', 'EB144C', 'FF6900', 'FCB900', '00D084', '039BE5', '9900EF'];

    const [visible, setVisible] = useState(false);

    const [selectedValue, setSelectedValue] = useState(undefined);

    const showDrawer = () => {
        props.onToggleEdit();
        setVisible(true);
        setSelectedValue(props.column.values.find(v => v.key === props.rowValue));
    };

    const onClose = () => {
        setVisible(false);
    };

    const onSelectOption = option => {
        setSelectedValue(option);
    }

    const onFgColorSelected = color => {
        if (selectedValue) {
            selectedValue.fgColor = color;
            const column = {...props.column};
            column.values = column.values.map(v => v.key === selectedValue.key ? selectedValue : v);
            props.onUpdateColumn(column);
        }
    }

    const onColorSelected = color => {
        if (selectedValue) {
            selectedValue.color = color;
            const column = {...props.column};
            column.values = column.values.map(v => v.key === selectedValue.key ? selectedValue : v);
            props.onUpdateColumn(column);
        }
    }

    const onToggleOptionDisabled = () => {
        if (selectedValue) {
            selectedValue.disabled = !selectedValue.disabled;
            const column = {...props.column};
            column.values = column.values.map(v => v.key === selectedValue.key ? selectedValue : v);
            props.onUpdateColumn(column);
        }
    }

    const onTitleChanged = title => {
        if (selectedValue) {
            selectedValue.title = title;
            const column = {...props.column};
            column.values = column.values.map(v => v.key === selectedValue.key ? selectedValue : v);
            props.onUpdateColumn(column);
        }
    }

    const addNewValue = () => {
        props.onAddNewColumnValue(props.column.model);
    }

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
                            onSelected={onSelectOption}
                            onTitleChanged={onTitleChanged}
                            key={i}
                            option={c}
                            selectedOption={selectedValue}>
                        </SelectCellForm>
                    })}
                </div>
                <Button onClick={addNewValue} className="select__newbtn"  type="dashed" size="small">
                    <Icon type="plus" />New Label
                </Button>
                <Switch
                    className="select__switch"
                    checkedChildren="enabled"
                    unCheckedChildren="disabled"
                    defaultChecked
                    checked={selectedValue && !selectedValue.disabled}
                    onClick={onToggleOptionDisabled}
                />
                <div className="select-swatches">
                    <SelectColorSwatch
                        selectedColor={selectedValue ? selectedValue.fgColor : undefined}
                        onColorSelected={onFgColorSelected}
                        title="Color"
                        colors={fgColors}
                    >
                    </SelectColorSwatch>
                    <SelectColorSwatch
                        selectedColor={selectedValue ? selectedValue.color : undefined}
                        onColorSelected={onColorSelected}
                        title="Background">
                    </SelectColorSwatch>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default SelectDrawer;