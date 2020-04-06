import React from 'react';
import styles from 'styled-components';

import ChannelForm from './ChannelForm';
// import ChannelHeaderMenu from './ChannelHeaderMenu';

const Header = styles.section`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 20fr 1fr;
    grid-template-areas: "content menu";
    padding-right: 10px;
`;

const ChannelHeader = ({ allowWrite, channel, onUpdate }) => {
    return (
        <Header>
            <ChannelForm allowWrite={allowWrite} onUpdate={onUpdate} channel={channel}/>
            {/* <ChannelHeaderMenu allowWrite={allowWrite} channelId={channel.id}/> */}
        </Header>
    )
}

export default ChannelHeader;
