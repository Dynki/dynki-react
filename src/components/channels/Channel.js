import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import styles from 'styled-components'

import { addMessage, loadMoreMessages, updateChannel } from '../../store/actions/channelActions'
import { ChannelContext } from '../../context/channelContext'

import ChannelFeed from './ChannelFeed'
import ChannelHeader from './ChannelHeader'
import MessageBox from '../editor/MessageBox'

const Container = styles.div`
    height: 100%;
`

const Channel = ({ addMessage, addReaction, channel, loadMoreMessages, messages, updateChannel }) => {

    const onReactionAdded = useCallback(() => {}, [])
    const onLoadMore = useCallback(() => loadMoreMessages(), [])
    const onAddMessage = useCallback(message => addMessage(channel, message), [channel])
    const onUpdateChannel = useCallback(channel => updateChannel(channel), [channel])

    const value = useMemo(() => ({ 
        channel, 
        messages, 
        onAddMessage, 
        onLoadMore, 
        onReactionAdded, 
        onUpdateChannel 
    }), [channel, messages])

    return (
        <ChannelContext.Provider value={value}>
            <Container>
                <ChannelHeader/>
                <ChannelFeed/>
                <MessageBox/>
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
        updateChannel: channel => dispatch(updateChannel(channel))
        // addReaction: (channel, reaction) => dispatch(addReaction(channel, reaction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel)
