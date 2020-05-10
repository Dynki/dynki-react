import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'

const ChannelEmoji = emojiSelected => {

    const addEmoji = emoji => {
        emojiSelected(emoji)
    }

    return (
        <Picker onSelect={addEmoji} set="google" style={{ border: 'none' }}/>
    )
}

export default ChannelEmoji;
