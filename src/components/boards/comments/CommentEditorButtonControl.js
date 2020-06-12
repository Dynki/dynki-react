import React from 'react';
import styles from 'styled-components';
import { Button, Tooltip } from 'antd';

const IconButton = styles(({ active, containerActive, ...rest}) => <Button {...rest}/>)`    
    background-color: ${props => !props.containerActive ? '#ffffff;' : props.active === 'true' ? '#DCDCDC;' : '#F8F8F8;'}

    border: none;
    box-shadow: none;
    margin: 5px;
    -webkit-box-shadow: none;

    :hover {
        background-color: ${props => !props.containerActive ? '#ffffff' : props.active === 'false' ? '#EFEFEF;' : '#F5F5F5;'}
    }
`;

const CommentEditorButtonControl = ({ action, containerActive, icon, onActionClick, title }) => {
    const [active, setActive] = React.useState('false');

    const onButtonClick = e => {
        e.preventDefault();

        if (active === 'true') {
            setActive('false');
        } else {
            setActive('true');
        }
        onActionClick(action);
    }

    return (
        <Tooltip title={title}>
            <IconButton active={active} containerActive={containerActive} icon={icon} onMouseDown={onButtonClick}/>
        </Tooltip>
    )
}

export default CommentEditorButtonControl;
