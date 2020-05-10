import React from 'react';
import styles from 'styled-components';
import { Button, Tooltip } from 'antd';
import EditorButtonControl from './EditorButtonControl';

const ButtonContainer = styles.div`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.active ? '#F8F8F8' : '#ffffff'};
    border-top: ${props => props.active ? '1px solid #DDDDDD;' : 'none;'}
`;

const IconButton = styles(Button)`    
    border: none;
    box-shadow: none;
    margin: 5px;
    margin-bottom: 0px;
    -webkit-box-shadow: none;
`;

const EditorButtons = ({ active, onActionClick }) => {
    return (
        <ButtonContainer active={active}>
            <EditorButtonControl containerActive={active} action="BOLD" icon="bold" title="Bold" onActionClick={onActionClick}/>
            <EditorButtonControl containerActive={active} action="ITALIC" icon="italic" title="Italic" onActionClick={onActionClick}/>
            <EditorButtonControl containerActive={active} action="STRIKETHROUGH" icon="strikethrough" title="Strikethrough" onActionClick={onActionClick}/>
            <Tooltip title="Code snippet">
                <IconButton icon="snippets"/>
            </Tooltip>
            <Tooltip title="Link">
                <IconButton icon="link"/>
            </Tooltip>
            <Tooltip title="Ordered list">
                <IconButton icon="ordered-list"/>
            </Tooltip>
            <Tooltip title="Bullet point">
                <IconButton icon="unordered-list"/>
            </Tooltip>
        </ButtonContainer>
    )
}

export default EditorButtons;
