import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import styles from 'styled-components'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'

import useOutsideClick from '../../hooks/ClickOutside'
import EditorButtons from '../editor/EditorButtons'

const StyledButton = styles(Button)`
    margin-left: auto;
`

const Container = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const CommentContainer = styles.div`
    background-color: #ffffff;
    border: solid;
    border-color: #3095DE;
    border-width: 1.1px;
    border-radius: 4px;
    bottom: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: ${props => props.active ? '180px;' : '40px;' }
    margin-bottom: 15px;
    width: 100%;

    .DraftEditor-root {
        height: ${props => props.active ? '180px;' : '30px;' }
        overflow: ${props => props.active ? 'auto;' : 'hidden;' }
        margin-bottom: 2px;
        padding: 8px;
    }

    .public-DraftEditorPlaceholder-root {
        color: rgb(186, 186, 193);
        padding-top: 3px;
        padding-left: 3px;
        margin-bottom: -20px;
    }
  

    .DraftEditor-editorContainer, .public-DraftEditor-content {
        height: 100%;
    }
`

function BoardDescription() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const editorRef = useRef(null)
    const containerRef = useRef(null)
    const [active, setActive] = useState(false)
    
    useEffect(() => {
        editorRef.current.focus()
    }, [])

    useOutsideClick(containerRef, () => {
        setActive(false)
    })

    const handleReturn = e => {
        e.preventDefault()
        setEditorState(EditorState.moveFocusToEnd(EditorState.createEmpty()))
        return false
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const onActionClick = action => {
        editorRef.current.focus()
        setEditorState(RichUtils.toggleInlineStyle(editorState, action))
    }

    return (
        <Container>
            <CommentContainer ref={containerRef} onClick={() => setActive(true)} active={active}>
                <Editor 
                    ref={editorRef} 
                    editorState={editorState} 
                    onChange={setEditorState} 
                    handleKeyCommand={handleKeyCommand} 
                    handleReturn={handleReturn}
                    placeholder="Write a comment"
                />
                {active && <EditorButtons onActionClick={onActionClick} active={active}/>}
            </CommentContainer>
            <StyledButton type="primary">Add Comment</StyledButton>
        </Container>
    )
}

export default BoardDescription
