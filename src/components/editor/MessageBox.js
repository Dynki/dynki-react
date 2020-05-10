import React, { useEffect, useRef, useState } from 'react'
import styles from 'styled-components'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'

import useOutsideClick from '../../hooks/ClickOutside'
import EditorButtons from './EditorButtons'
import useChannelContext from '../../hooks/useChannelContext'

const Container = styles.div`
    background-color: #ffffff;
    border: solid;
    border-color: #767676;
    border-width: 1.1px;
    border-radius: 4px;
    bottom: 8px;
    cursor: pointer;
    height: 85px;
    margin: 10px;
    position: fixed;
    width: calc(100% - 300px);
    z-index: 1000;

    .DraftEditor-root {
        margin-bottom: 2px;
        padding: 8px;
    }
`

function MessageBox() {
    const {onAddMessage} = useChannelContext()

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const editorRef = useRef(null)
    const containerRef = useRef(null)
    const [active, setActive] = useState(true)
    
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
        if (command === 'split-block') {
            const raw = convertToRaw(editorState.getCurrentContent())
            onAddMessage(raw)
            return 'handled'
        } else {
            const newState = RichUtils.handleKeyCommand(editorState, command)
            if (newState) {
                setEditorState(newState)
                return 'handled'
            }
        }
        return 'not-handled'
    }

    const onActionClick = action => {
        editorRef.current.focus()
        setEditorState(RichUtils.toggleInlineStyle(editorState, action))
    }

    return (
        <Container ref={containerRef} onClick={() => setActive(true)}>
            <Editor ref={editorRef} editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} handleReturn={handleReturn}/>
            <EditorButtons onActionClick={onActionClick} active={active}/>
        </Container>
    )
}

export default MessageBox
