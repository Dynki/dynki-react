import React, { useEffect, useRef, useState } from 'react'
import styles from 'styled-components'
import { Button, Divider } from 'antd'
import * as moment from 'moment'
import { Waypoint } from 'react-waypoint'

import ChannelMessage from './ChannelMessage'
import useChannelContext from '../../hooks/useChannelContext'

const Container = styles.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 160px);
    margin-top: 1px;
    overflow-x: none;
    overflow-y: scroll;
    padding-bottom: 105px;
    position: fixed;
    top: 160px;
    width: 83%;
    z-index: 10;
`

const InnerContainer = styles.div`
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 105px;
    width: 83%;
    z-index: 10;
`

const MsgContainer = styles.div`
    visibility: ${props => props.isHidden ? 'hidden' : 'visible'}

`

function ChannelFeed() {

    const {messages, onLoadMore} = useChannelContext()

    const [loading, setLoading] = useState(true)
    const messagesEndRef = useRef(null)
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (messagesEndRef && messagesEndRef.current) {
                setLoading(false)
            }
        })
    }, [messages, messagesEndRef])

    const checkLoadMore = obj => {
        if (obj.previousPosition === 'above') {
            onLoadMore()
        }
    }

    if (!messages) {
        return null
    }

    return (
        <Container ref={scrollContainerRef}>
            <InnerContainer>
                <div ref={messagesEndRef}/>
                {messages.map((m, i) => {
                    const previous = i > 0 ? messages[i-1] : undefined
                    const firstMessage = i === 0
                    const lastMessage = i === messages.length - 1
                    const userDiffers = ((m && previous) && m.user.id !== previous.user.id)
                    const timestampPastAnHour = ((m && previous) && !moment(m.timestamp).isSame(previous.timestamp, 'hour'))
                    const displayAvatar = (firstMessage || lastMessage) || timestampPastAnHour || userDiffers
                    const showDivider = previous && (!moment(m.timestamp).isSame(previous.timestamp, 'day') || i===0)

                    return (
                        <MsgContainer key={m.id} isHidden={loading}>
                            {showDivider &&  
                                <Divider>
                                    <Button shape="round">{moment(m.timestamp).format('dddd Do MMMM')}</Button>
                                </Divider>
                            }
                            <ChannelMessage message={m} displayAvatar={displayAvatar}/>
                            {lastMessage && <Waypoint onEnter={checkLoadMore}/>}
                        </MsgContainer>
                    )
                })}
            </InnerContainer>
        </Container>
    )
}

export default ChannelFeed
