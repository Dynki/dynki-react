import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Spin, Typography } from 'antd';

const { Text } = Typography;

const StyledContent = styles.section`
    padding: 50px;
    background-color: #ffffff;
    grid-area: section3;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`;

const Brand = styles.div`

    display: flex;
    flex-direction: row;
    justify-content: start;

    h1 {
        color: #535455;
        font-size: 30px;
        font-weight: 300;
    }

    // /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {

        h1 {
            font-size: 25px;
        }
    }
`;

const Logo = styles.div`
    width: 55px;
    height: 42px;
    margin-left: 11px;
    display: inline-block;
    background-image: url(/assets/img/logo-blue-sm.png), none;
    background-size: 53px 42px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 38px;
        height: 31px;
        margin-left: 0px;
        background-size: 37px 29px;
    }
`;

const CopyRightText = styles.div`
    padding-left: 15px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        padding: 0px;
    }
`;

const LeftSection = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const RightSection = styles.div`
    margin-left: 100px;
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const StyledLink = styles.a`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    color: rgba(0, 0, 0, 0.65);
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
  
    :hover {
        text-decoration: none;
    }

    :focus {
        text-decoration: none;
        outline: none;
    }
`;

const StyledText = styles(Text)`
    margin-bottom: 10px;
`;

const Footer = props => {
    return (
        <StyledContent>
            <LeftSection>
                <Brand>
                    <Link id="backToHome" to="/home">
                        <Spin indicator={<Logo/>}></Spin>
                    </Link>
                    <h1>Dynki</h1>
                </Brand>
                <CopyRightText>
                    <Text>All rights reserved</Text>
                    <div>© Dynki.com</div>
                </CopyRightText>
            </LeftSection>
            <RightSection>
                <StyledText strong>Help</StyledText>
                <StyledLink href="mailto:support@dynki.com">Contact us</StyledLink>
                <StyledText>Email: support@dynki.com</StyledText>
            </RightSection>
            <RightSection>
                <StyledText strong>Legal</StyledText>
                <StyledLink href="/terms-of-service.pdf">Terms of service</StyledLink>
                <StyledLink href="/privacy-policy.pdf">Privacy policy</StyledLink>
            </RightSection>
        </StyledContent>
    )
}

export default Footer;