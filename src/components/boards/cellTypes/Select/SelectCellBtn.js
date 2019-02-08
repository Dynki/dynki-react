import React from 'react';
import { Button } from 'antd';

const SelectCellBtn = (props) => {
    const { key, color, column, rowId } = props;

    return <Button 
        key={key}
        className="select__option"
        style={{backgroundColor: `#${color.color}`}}
        onClick={() => props.onSelectOption(color.key, column.model, rowId)}
    >
        {color.title}
    </Button>
}

export default SelectCellBtn;