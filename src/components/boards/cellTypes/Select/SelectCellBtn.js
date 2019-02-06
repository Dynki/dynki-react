import React from 'react';
import { Button } from 'antd';

const SelectCellBtn = (props) => {
    const { key, col, rowId } = props;

    return <Button 
        key={key}
        className="select__option"
        style={{backgroundColor: `#${col.color}`}}
        // onClick={() => this.selectOption(col.key, col.model, rowId)}
    >
        {col.title}
    </Button>
}

export default SelectCellBtn;