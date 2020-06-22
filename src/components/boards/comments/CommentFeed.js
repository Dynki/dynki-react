import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from 'styled-components'
import { Button, Divider, Skeleton } from 'antd'
import * as moment from 'moment'
import { Waypoint } from 'react-waypoint'

import CommentMessage from './CommentMessage'
import useChannelContext from '../../../hooks/useChannelContext'
import { useScrollPosition } from '../../../hooks/useScrollPosition'

const Container = styles.div`
    display: flex;
    flex-direction: column;
    height: 100%
    margin-top: 15px;
    overflow-x: none;
    overflow-y: auto;
    width: 100%;
`

const InnerContainer = styles.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    overflow: none;
    overflow-y: auto;
    padding-left: 0px;
    z-index: 10;
`

const MsgContainer = styles.li`
    // visibility: ${props => props.isHidden ? 'hidden' : 'visible'}
`

function CommentFeed() {

    const { messages, onLoadMore, onLikeMessage } = useChannelContext()

    const checkLoadMore = obj => {
        if (obj.previousPosition === 'above') {

            onLoadMore()
        }
    }

    if (!messages) {
        return (
            <Container>
                <Skeleton loading={true} active avatar/>
                <Skeleton loading={true} active avatar/>
            </Container>
        )
    }

    return (
        <Container>
            <InnerContainer >
                {messages.map((m, i) => {
                    const previous = i > 0 ? messages[i - 1] : undefined
                    const firstMessage = i === 0
                    const lastMessage = i === messages.length - 2
                    const userDiffers = ((m && previous) && m.user.id !== previous.user.id)
                    const timestampPastAnHour = ((m && previous) && !moment(m.timestamp).isSame(previous.timestamp, 'hour'))
                    const displayAvatar = (firstMessage || lastMessage) || timestampPastAnHour || userDiffers
                    const showDivider = previous && (!moment(m.timestamp).isSame(previous.timestamp, 'day') || i === 0)

                    return (
                        <MsgContainer key={m.id}>
                            {showDivider &&
                                <Divider>
                                    <Button shape="round">{moment(m.timestamp).format('dddd Do MMMM')}</Button>
                                </Divider>
                            }
                            <CommentMessage message={m} displayAvatar={displayAvatar} onLikeMessage={onLikeMessage}/>
                            {lastMessage && <Waypoint onEnter={checkLoadMore} />}
                        </MsgContainer>
                    )
                })}
            </InnerContainer>
        </Container>
    )
}

export default CommentFeed
