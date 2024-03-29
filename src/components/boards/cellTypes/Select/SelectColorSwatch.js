import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const SelectColorSwatch = props => {
    const colors = props.colors || ['ffffff', 'EB144C', 'FF6900', 'FCB900', '00D084', 'EFF1F3', '039BE5', '9900EF'];
    var checkmark = '✔';

    const [selectedColor, setSelectedColor] = useState(undefined);

    useEffect(() => {
        setSelectedColor(props.selectedColor);
    }, [props.selectedColor])

    return <div className="select-color">
        <div>{props.title}</div>
        <div className="select-color__colors">

            {colors.map((c, i) => {
            return <Button 
                key={i}
                className={i === 0 ? "select-color__swatchbtn select-color__swatchbtn--first" : "select-color__swatchbtn"}
                style={{backgroundColor: `#${c}`}}
                onClick={() => props.onColorSelected(c)}
            >
                {selectedColor === c ? <div className="text">{checkmark}</div> : null}
            </Button>})}
        </div>
    </div>
}

export default SelectColorSwatch;