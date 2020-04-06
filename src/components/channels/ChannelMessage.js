import React from 'react';
import styles from 'styled-components';

const Container = styles.div`
    position: absolute;
    bottom: 10px;
    height: 100px;
    border: dashed;
    border-color: #3095DE;
    border-width: 1.1px;
    border-radius: 4px;
    margin: 10px;
    width: calc(100% - 280px);
`;

const ChannelMessage = props => {

    return (
        <Container>

        </Container>
    )
}

export default ChannelMessage;
