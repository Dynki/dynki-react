import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import styles from 'styled-components'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'

import { addMessage, getRowChannel, loadMoreMessages, updateChannel } from '../../../store/actions/channelActions'
import { ChannelContext } from '../../../context/channelContext'

import useOutsideClick from '../../../hooks/ClickOutside'
import CommentEditorButtons from './CommentEditorButtons'
import CommentFeed from './CommentFeed'

const StyledButton = styles(Button)`
    margin-left: auto;
`

const Container = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ActiveMonitor = styles.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
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
    transition: height 300ms ease-in-out;

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

const Comments = ({ addMessage, addReaction, channel, getRowChannel, loadMoreMessages, messages, updateChannel, rowId }) => {

    const onReactionAdded = useCallback(() => {}, [])
    const onLoadMore = useCallback(() => loadMoreMessages(), [])
    const onAddMessage = useCallback(message => addMessage(channel, message), [channel])
    const onUpdateChannel = useCallback(channel => updateChannel(channel), [channel])
    const onGetRowChannel = useCallback(rowId => getRowChannel(rowId), [rowId])

    const value = useMemo(() => ({ 
        channel, 
        messages, 
        onAddMessage, 
        onGetRowChannel,
        onLoadMore, 
        onReactionAdded, 
        onUpdateChannel 
    }), [channel, messages])

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const editorRef = useRef(null)
    const containerRef = useRef(null)
    const [active, setActive] = useState(false)
    
    useEffect(() => {
        editorRef.current.focus()
        onGetRowChannel(rowId)
    }, [rowId])

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

    const addComment = () => {
        const raw = convertToRaw(editorState.getCurrentContent())
        onAddMessage(raw)
        setEditorState(EditorState.createEmpty())
        setActive(false)
    }

    return (
        <ChannelContext.Provider value={value}>
            <Container>
                <ActiveMonitor ref={containerRef}>
                    <CommentContainer onClick={() => setActive(true)} active={active}>
                        <Editor 
                            ref={editorRef} 
                            editorState={editorState} 
                            onChange={setEditorState} 
                            handleKeyCommand={handleKeyCommand} 
                            handleReturn={handleReturn}
                            placeholder="Write a comment"
                        />
                        {active && <CommentEditorButtons onActionClick={onActionClick} active={active}/>}
                    </CommentContainer>
                    <StyledButton onClick={addComment} type="primary">Add Comment</StyledButton>
                </ActiveMonitor>
                <CommentFeed/>
            </Container>
        </ChannelContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        channel: state.channel.current,
        messages: state.channel.currentMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage: (channel, message) => dispatch(addMessage(channel, message)),
        loadMoreMessages: () => dispatch(loadMoreMessages()),
        updateChannel: channel => dispatch(updateChannel(channel)),
        getRowChannel: rowId => dispatch(getRowChannel(rowId))
        // addReaction: (channel, reaction) => dispatch(addReaction(channel, reaction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
