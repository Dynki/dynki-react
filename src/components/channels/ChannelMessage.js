import React from 'react';
import styles from 'styled-components';
import { Button, Input } from 'antd';

const Container = styles.div`
    cursor: pointer;
    border: solid;
    border-color: #767676;
    border-width: 1.1px;
    border-radius: 4px;
    bottom: 10px;
    height: 85px;
    margin: 10px;
    position: absolute;
    width: calc(100% - 280px);

`;

const StyledInput = styles(Input)`
    width: 100%;
    border: none;
    border-radius: 0px;

    :focus {
        border-bottom: solid;
        border-bottom-width: 1px;
        border-color: #DDDDDD;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
`;

const ButtonContainer = styles.div`
    display: flex;
    flex-direction: row;
`;

const IconButton = styles(Button)`    
    border: none;
    box-shadow: none;
    margin: 5px;
    -webkit-box-shadow: none;
`;

const ChannelMessage = () => {
    console.log('rendered');
    // const containerRef = React.useRef(null);

    // const onContainerClick = () => {
    //     console.log('Fired');
    //     containerRef.current.focus();
    // }

    return (
        <Container>
            <StyledInput size="large"/>
            <ButtonContainer>
                <IconButton icon="bold"/>
                <IconButton icon="italic"/>
                <IconButton icon="strikethrough"/>
                <IconButton icon="snippets"/>
                <IconButton icon="link"/>
                <IconButton icon="ordered-list"/>
                <IconButton icon="unordered-list"/>

            </ButtonContainer>
        </Container>
    )
}

export default ChannelMessage;
