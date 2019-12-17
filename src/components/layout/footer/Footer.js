import React from 'react';
import styles from 'styled-components';

const StyledContent = styles.section`
    padding: 50px;
    background-color: #EFF1F3;
    grid-area: section3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Footer = props => {

    return (
        <StyledContent>
            <div>Content</div>
        </StyledContent>
    )
}

export default Footer;