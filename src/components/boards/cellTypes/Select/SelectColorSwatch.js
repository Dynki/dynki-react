import React from 'react';
import { Button } from 'antd';

const SelectColorSwatch = (props) => {
    const colors = ['ffffff', 'D73026', 'FF6900', 'FCB900', '00D084', '7BDCB5', '039BE5', '9900EF'];
    var checkmark = '✔';

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
                {props.selectedColor === c ? <div className="text">{checkmark}</div> : null}
            </Button>})}
        </div>
    </div>
}

export default SelectColorSwatch;