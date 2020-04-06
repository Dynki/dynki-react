import React from 'react';
import { connect } from 'react-redux';
import ChannelHeader from './ChannelHeader';
import ChannelMessage from './ChannelMessage';

const Channel = ({ channel }) => {
    return (
        <div>
            <ChannelHeader channel={channel} allowWrite={true}/>
            <ChannelMessage/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        channel: state.channel.current
    }
}

export default connect(mapStateToProps, null)(Channel);
