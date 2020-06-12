import React, { useState } from 'react';
import { Drawer, Button, Icon, Tooltip } from 'antd';
import { Editor } from 'draft-js';
import Comments from './Comments';
import styles from 'styled-components';

const StyledButton = styles(Button)`
    cursor: pointer;
    border: none;
    border-radius: 0px;
    border-right: solid;
    border-right-width: 1px;
    border-right-color: #cdd3da;
    background-color: #eff1f3;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #D1D3D4;
    height: 100%;

    &:hover {
        background-color: #eff1f3;
        border-right: solid;
        border-right-width: 1px;
        border-right-color: #cdd3da;
        background-color: #eff1f3;
        border-bottom: solid;
        border-bottom-width: 1px;
        border-bottom-color: #D1D3D4;

        i { 
            color: #2B82C1;
        }
    }

`

const StyledIcon = styles(Icon)`
    color: #CFD3D7;
    font-size: 18px;
`

const BoardRowDescription = ({ allowWrite, rowId }) => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <Tooltip title="Comments" placement="left">
                <StyledButton disabled={!allowWrite} onClick={showDrawer} type="link" size="small">
                    <StyledIcon type="fire" />
                </StyledButton>
            </Tooltip>

            <Drawer

                title="Discussion"
                width={570}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: '100%',
                    paddingBottom: '108px',
                }}
            >
                {visible && <Comments rowId={rowId}/>}
            </Drawer>
        </React.Fragment>
    );
}

export default BoardRowDescription;