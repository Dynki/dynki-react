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

const MsgContainer = styles.div`
    visibility: ${props => props.isHidden ? 'hidden' : 'visible'}

`

function ChannelFeed() {

    const {messages} = useChannelContext();

    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesEndRef && messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        })
    }
  
    React.useEffect(scrollToBottom, [messages, messagesEndRef]);

    const checkLoadMore = obj => {
        if (obj.previousPosition === 'above') {
            console.log(obj)
            // onLoadMore();
        }
    }

    if (!messages) {
        return null;
    }

    return (
        <Container>
            {messages.map((m, i) => {
                const previous = i > 0 ? messages[i-1] : undefined;
                const displayAvatar = i === 0 || !moment(m.timestamp).isSame(previous.timestamp, 'hour');

                const returnEl = <MsgContainer key={m.id} isHidden={loading}>
                    {(previous && !moment(m.timestamp).isSame(previous.timestamp, 'day') || i===0)  
                    && <Divider>
                        {i === 0 ? <Waypoint onEnter={checkLoadMore}/> : null}
                        <Button shape="round">{moment(m.timestamp).format('dddd Do MMMM')}</Button>
                       </Divider>
                    }
                    <ChannelMessage message={m} displayAvatar={displayAvatar}/>
                    {i === messages.length - 1 ? 
                        <div ref={messagesEndRef}>
                            <Waypoint onEnter={() => setLoading(false)}/>
                        </div> : null
                    }
                </MsgContainer>

                return returnEl;
            })}
            
        </Container>
    );
}

export default ChannelFeed;
