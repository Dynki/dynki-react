import React from 'react';
import styles from 'styled-components';

const StyledSection = styles.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        flex-direction: column;
        min-height: calc(100% - 20px);
        width: 95%;

        a {
            width: 100%;
        }
    }
`;

const ProductOfferings = ({ children }) => {
    return (
        <StyledSection className="pricing">
            {children}
        </StyledSection>
    );
} 

export default ProductOfferings;