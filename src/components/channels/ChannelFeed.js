import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from 'styled-components'
import { Button, Divider } from 'antd'
import * as moment from 'moment'
import { Waypoint } from 'react-waypoint'

import ChannelMessage from './ChannelMessage'
import useChannelContext from '../../hooks/useChannelContext'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const Container = styles.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 265px);
    margin-top: 1px;
    overflow-x: none;
    overflow-y: auto;
    position: fixed;
    top: 160px;
    width: 83%;
    z-index: 10;
`

const InnerContainer = styles.ul`
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
    overflow: none;
    padding-left: 0px;
    z-index: 10;
`

const MsgContainer = styles.li`
    // visibility: ${props => props.isHidden ? 'hidden' : 'visible'}
`

function ChannelFeed() {

    const {messages, onLoadMore} = useChannelContext()
    const initialLoad = useRef(true)

    const checkLoadMore = obj => {
        if (obj.previousPosition === 'above') {
            
            onLoadMore()
        }
    }

    const messagesEndRef = useCallback(node => {
        console.log('initial load', initialLoad.current)
        if (node !== null && initialLoad.current) {
            node.scrollIntoView({ behavior: 'smooth' })

            setTimeout(() => {
                initialLoad.current = false;
            }, 1000)
        }
    }, [messages])

    console.log('render')

    if (!messages) {
        return null
    }

    return (
        <Container>
            <InnerContainer >
                <div ref={messagesEndRef}>End</div>
                {messages.map((m, i) => {
                    const previous = i > 0 ? messages[i-1] : undefined
                    const firstMessage = i === 0
                    const lastMessage = i === messages.length - 2
                    const userDiffers = ((m && previous) && m.user.id !== previous.user.id)
                    const timestampPastAnHour = ((m && previous) && !moment(m.timestamp).isSame(previous.timestamp, 'hour'))
                    const displayAvatar = (firstMessage || lastMessage) || timestampPastAnHour || userDiffers
                    const showDivider = previous && (!moment(m.timestamp).isSame(previous.timestamp, 'day') || i===0)

                    return (
                        <MsgContainer key={m.id}>
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
