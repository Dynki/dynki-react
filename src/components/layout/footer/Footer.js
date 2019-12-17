import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

const StyledContent = styles.section`
    padding: 50px;
    background-color: #ffffff;
    grid-area: section3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        justify-content: center;
        align-items: center;
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
    background-image: url(/assets/img/logo-blue.png), none;
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

const Footer = props => {

    return (
        <StyledContent>
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
        </StyledContent>
    )
}

export default Footer;