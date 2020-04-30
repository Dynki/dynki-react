import React from 'react';
import { ChannelContext } from '../context/channelContext';

export default function useChannelContext() {
    const context = React.useContext(ChannelContext)
    if (!context) {
        throw new Error(
            `Channel compound components cannot be rendered outside the Channel component`,
        )
    }
    return context
}
