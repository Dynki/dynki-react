import React from 'react';
import { MessageContext } from '../context/messageContext';

export default function useMessageContext() {
    const context = React.useContext(MessageContext)
    if (!context) {
        throw new Error(
            `Message compound components cannot be rendered outside the Message component`,
        )
    }
    return context
}
