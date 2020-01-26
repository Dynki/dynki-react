import React, { useState } from 'react';
import { Drawer, Button, Card, Checkbox, Icon, Switch } from 'antd';
import SelectCellForm from './SelectCellInput';
import SelectColorSwatch from './SelectColorSwatch';
import { Droppable } from 'react-beautiful-dnd';

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

    const onDefaultSelected = e => {
        if (selectedValue) {
            selectedValue.default = e.target.checked;
            const column = {...props.column};
            column.values = column.values.map(v => {
                if (v.key !== selectedValue.key) {
                    v.default = false;
                } 
                return v;
            });
            props.onUpdateColumn(column);
        }
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
            <Button disabled={!props.allowWrite} onClick={showDrawer} type="dashed" size="small">
                <Icon type="edit"/> Edit Labels
            </Button>

            <Drawer
                title={props.column.title + " - Labels"}
                width={370}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: '100%',
                    paddingBottom: '108px',
                }}
            >
                <Button onClick={addNewValue} className="select__newbtn"  type="dashed" size="small">
                    <Icon type="plus" />New Label
                </Button>
                <Droppable droppableId={props.column.model} type="select">
                    {outerProvided =>(
                        <ul ref={outerProvided.innerRef} {...outerProvided.droppableProps} className="select__drawer-colors">
                            {props.column.values.map((c, i) => {
                                return (
                                    <li key={i}>
                                        <SelectCellForm
                                            onSelected={onSelectOption}
                                            onTitleChanged={onTitleChanged}
                                            key={i}
                                            index={i}
                                            option={c}
                                            selectedOption={selectedValue}>
                                        </SelectCellForm>
                                    </li>
                                )
                            })}
                        </ul>
                    )}  
                </Droppable>
                <Card
                    title="Label Properties"
                >
                    <Switch
                        className="select__switch"
                        checkedChildren="Enabled"
                        unCheckedChildren="Disabled"
                        defaultChecked
                        checked={selectedValue && !selectedValue.disabled}
                        onClick={onToggleOptionDisabled}
                    />
                    <Checkbox 
                        className="select__default" 
                        checked={selectedValue && selectedValue.default}
                        onChange={onDefaultSelected}
                    >
                        Is default label
                    </Checkbox>
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
                </Card>
            </Drawer>
        </React.Fragment>
    );
}

export default SelectDrawer;