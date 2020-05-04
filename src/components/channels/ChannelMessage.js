import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { MessageContext } from '../../context/messageContext'
import ChannelMessageContent from './ChannelMessageContent'

const Container = styles.div`
    border: none;
    display: flex;
    flex-direction: row;
    margin: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: calc(100% - 20px);

    .DraftEditor-root {
        padding: 8px;
        padding-top: 0px;
        margin-left: 2px;
        
    }
`

const ChannelMessage = ({ disableHover, displayAvatar, message, onReactionAdded, toggleEmojiStatus }) => {

    const onToggleEmojiPicker = useCallback(message => toggleEmojiStatus(), [])

    const value = useMemo(() => ({ disableHover, displayAvatar, message, onReactionAdded, onToggleEmojiPicker }), [message])

    return (
        <Container>
            <MessageContext.Provider value={value}>
                <ChannelMessageContent/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessage)
