import React from 'react'
import styles from 'styled-components'

import ChannelForm from './ChannelForm'
import useChannelContext from '../../hooks/useChannelContext'

const Header = styles.section`
    display: grid;
    background-color: #ffffff;
    border-bottom: solid;
    border-bottom-color: #D7D7D7;
    border-bottom-width: 1px;
    grid-template-rows: auto;
    grid-template-columns: 20fr 1fr;
    grid-template-areas: "content menu";
    padding-right: 10px;
    position: fixed;
    top: 65px;
    width: calc(100% - 280px);
`

function ChannelHeader() {
    const {channel, onUpdateChannel} = useChannelContext()
    return (
        <Header>
            <ChannelForm allowWrite={true} channel={channel} onUpdateChannel={onUpdateChannel}/>
            {/* <ChannelHeaderMenu allowWrite={allowWrite} channelId={channel.id}/> */}
        </Header>
    )
}

export default ChannelHeader
