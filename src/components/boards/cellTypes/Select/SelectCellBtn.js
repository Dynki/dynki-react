import React from 'react';
import { Button } from 'antd';

const SelectCellBtn = (props) => {
    const { allowWrite, color, column, rowId } = props;

    let fgColor = 'ffffff';
    if (color.fgColor) {
        fgColor = color.fgColor;
    }

    return <Button 
        // key={key}
        disabled={!allowWrite}
        className="select__option"
        style={{backgroundColor: `#${color.color}`, color: `#${fgColor}`}}
        onClick={() => props.onSelectOption(color.key, column.model, rowId)}
    >
        {color.title}
    </Button>
}

export default SelectCellBtn;