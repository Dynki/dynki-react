import React from 'react';
import { Button } from 'antd';

const SelectColorSwatch = (props) => {
    const colors = ['EB144C', 'FF6900', '0693E3', '00D084'];

    return <div className="select__color">
        <Button className="select__swatchbtn select__swatchbtn--first" style={{backgroundColor: `#${props.selectedColor}`}}></Button>
        {colors.map((c, i) => {
        return <Button 
            key={i}
            className="select__swatchbtn"
            style={{backgroundColor: `#${c}`}}
        >
        </Button>})}
    </div>
}

export default SelectColorSwatch;