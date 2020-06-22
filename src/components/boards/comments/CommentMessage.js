import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { MessageContext } from '../../../context/messageContext'
import CommentMessageContent from './CommentMessageContent'

const Container = styles.div`
    border: none;
    display: flex;
    flex-direction: row;
    width: 100%;

    .DraftEditor-root {
        padding: 8px;
        padding-top: 0px;
        margin-left: 2px;
        
    }
`

const CommentMessage = ({ disableHover, displayAvatar, message, onLikeMessage, onReactionAdded, toggleEmojiStatus }) => {

    const onToggleEmojiPicker = useCallback(message => toggleEmojiStatus(), [])

    const value = useMemo(() => ({ disableHover, displayAvatar, message, onLikeMessage, onReactionAdded, onToggleEmojiPicker }), [message])

    return (
        <Container>
            <MessageContext.Provider value={value}>
                <CommentMessageContent/>
            </MessageContext.Provider>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleEmojiStatus: () => dispatch({ type: 'TOGGLE_EMOJI' })
    }
}

const mapStateToProps = state => {
    return {
        disableHover: state.channel.emojiShowing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentMessage)
