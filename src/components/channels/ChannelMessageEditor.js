import React from 'react';
import styles from 'styled-components';
import { Button, Tooltip } from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';

const Container = styles.div`
    cursor: pointer;
    border: solid;
    border-color: #767676;
    border-width: 1.1px;
    border-radius: 4px;
    bottom: 8px;
    height: 85px;
    margin: 10px;
    position: absolute;
    width: calc(100% - 280px);

    .DraftEditor-root {
        padding: 8px;
    }
`;

const ButtonContainer = styles.div`
    display: flex;
    flex-direction: row;
`;

const IconButton = styles(Button)`    
    border: none;
    box-shadow: none;
    margin: 5px;
    -webkit-box-shadow: none;
`;

const ChannelMessage = () => {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const editorRef = React.useRef(null);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          setEditorState(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    const _onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        editorRef.current.focus();
    }

    return (
        <Container>
            <Editor ref={editorRef} editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand}/>
            <ButtonContainer>
                <Tooltip title="Bold">
                    <IconButton icon="bold" onClick={_onBoldClick}/>
                </Tooltip>
                <Tooltip title="Italic">
                    <IconButton icon="italic"/>
                </Tooltip>
                <Tooltip title="Strikethrough">
                    <IconButton icon="strikethrough"/>
                </Tooltip>
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
        </Container>
    )
}

export default ChannelMessage;
