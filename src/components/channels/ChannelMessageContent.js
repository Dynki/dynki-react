import React, { useState } from 'react'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { Avatar, Icon, Popover, Tooltip } from 'antd'
import * as moment from 'moment'
import styles from 'styled-components'

import useMessageContext from '../../hooks/useMessageContext';
import ChannelEmoji from './ChannelEmoji'

const Container = styles.div`
    border: none;
    display: flex;
    flex-direction: row;
    margin: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: calc(100% - 20px);

    .DraftEditor-root {
        padding: 8px;
        padding-top: 0px;
        margin-left: 2px;
        
    }
`

const SubContainer = styles.div`
    display: flex;
    flex-direction: column;
`;

const MessageOnlyContainer = styles.div`
    align-items: center;
    background-color: ${props => props.hover === 'true' ? '#F8F8F8;' : '#ffffff;'}
    display: flex;
    flex-direction: row;
    width: 100%;


    .DraftEditor-root {
        padding: 8px;
        margin-left: 2px;
    }
`;

const UserDetails = styles.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Name = styles.div`
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;    
    margin-top: 5px;
`;

const Time = styles.div`
    color: ${props => props.hover === 'true' ? '#59596E;' : '#ffffff;'}
    font-size: 12px;
    margin-right: 9px;
`;

const FullMsgTime = styles.div`
    font-size: 12px;
    margin-top: 5px;
`;

const StyledAvatar = styles(Avatar)`
    background-color: #3095DE;
`;

const FullMsgContainer = styles.div`
    align-items: center;
    background-color: ${props => props.hover === 'true' ? '#F8F8F8;' : '#ffffff;'}
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const StyledPopover = styles(Popover)`
    .ant-popover-inner-content {
        padding: 0px!important;
    }
`;

const IconButton = styles(Icon)`
    font-size: 22px;
    // margin-left: auto;
    margin-right: 15px;
`;

const Reactions = styles.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`;

function ChannelMessageContent() {

    const {disableHover, displayAvatar, message, onToggleEmojiPicker, onReactionAdded} = useMessageContext()

    const [messageHover, setMessageHover] = useState('false')    
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [editorState] = useState(EditorState.createWithContent(convertFromRaw(message.content)))
    const [name] = useState(message.user && message.user.name ? message.user.name : undefined)

    const onChange = () => {}

    const onShowEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
        onToggleEmojiPicker()
    }

    const onHideEmojiPicker = visibility => {
        if (visibility === false) {
            setShowEmojiPicker(false)
            setMessageHover('false')
            onToggleEmojiPicker()
        }
    }

    const onSetMessageHover = status => {
        if (!disableHover) {
            setMessageHover(status)
        }
    }

    const renderReactionPicker = () => {
        return (
            <Reactions>
                <StyledPopover 
                    content={<ChannelEmoji emojiSelected={onReactionAdded}/>}
                    trigger="click"
                    visible={showEmojiPicker}
                    onVisibleChange={onHideEmojiPicker}
                >
                    <Tooltip title="Add reaction">
                        <IconButton type="smile" onClick={onShowEmojiPicker}/>
                    </Tooltip>
                </StyledPopover>
                <Tooltip title="Start thread">
                    <IconButton type="message" />
                </Tooltip>
                <Tooltip title="Share message">
                    <IconButton type="share-alt" />
                </Tooltip>
            </Reactions>
        )
    }

    return (
        <Container>
            {displayAvatar ? 
                <FullMsgContainer hover={messageHover} onMouseEnter={() => onSetMessageHover('true')} onMouseLeave={() => onSetMessageHover('false')}>
                    {name ? 
                        <StyledAvatar size="large" shape="square">{name.charAt(0).toLocaleUpperCase()}</StyledAvatar>
                        :
                        <StyledAvatar size="large" shape="square" icon="user"/>
                    }
                    <SubContainer>
                        <UserDetails>
                            <Name>{name}</Name>
                            <FullMsgTime>{moment(message.timestamp).format('HH:MM')}</FullMsgTime>
                        </UserDetails>
                        <Editor editorState={editorState} onChange={onChange} readOnly={true}/>
                    </SubContainer>
                    {messageHover === 'true' && renderReactionPicker()}

                </FullMsgContainer>
                :
                <MessageOnlyContainer 
                    onMouseEnter={() => onSetMessageHover('true')} 
                    onMouseLeave={() => onSetMessageHover('false')} 
                    hover={messageHover}
                >
                    <Time hover={messageHover}>{moment(message.timestamp).format('HH:MM')}</Time>
                    <Editor editorState={editorState} onChange={onChange} readOnly={true}/>
                    {messageHover === 'true' && renderReactionPicker()}
                </MessageOnlyContainer>
            }
        </Container>
    )
}

export default ChannelMessageContent
