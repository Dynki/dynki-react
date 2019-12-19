import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from 'styled-components';

import { Spin } from 'antd';

const StyledContent = styles.div`
    position: relative;
    min-height: 80px;
    max-height: 80px;
    grid-area: header;

    background-color: #a5a4a4;
    z-index: 1;
`;

const Brand = styles.div`
    position: absolute;
    left: 15px;
    top: 9px;
    padding: 10px;  

    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: start;

    h1 {
        font-size: 34px;
        font-weight: 300;
        color: #ffffff;
    }

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 0px;
        padding-top: 9px;

        h1 {
            margin-bottom: 0px;
            font-size: 23px;
        }

    }

`;

const HomeLinks = styles.div`
    position: absolute;
    right: 37px;
    top: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 10;

    a {
        margin-left: 30px;
        margin-right: 30px;
        color: #ffffff;

        font-family: $font-family;
        font-size: 18px;
        font-weight: 500;

        &:hover {
            color: #2D83C1;
        }
    }

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        right: 27px;
        top: 35px;
    
        a {
            margin-left: 18px;
            margin-right: 9px;
            font-size: 14px;
            font-weight: lighter;
            color: #414141c2;
        }
    }
`;

const Logo = styles.div`
    width: 55px;
    height: 42px;
    margin-left: 11px;
    display: inline-block;
    background-image: url(/assets/img/logo-blue-sm.png), none;
    background-size: 53px 46px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 38px;
        height: 31px;
        margin-left: 0px;
        background-size: 37px 29px;
    }
`;

const StyledLink = styles(Link)`
    border: ${({ location, match }) => match.includes(location.pathname) ? 'solid' : 'none'};
    border-width: 1.5px;
    border-color: #ffffff;
    border-radius: 4px;
    padding: 5px;

    &:hover {
        border-color: #2D83C1;
    }
`;

const PreAuthToolbar = ({ location }) => {
    return (
        <StyledContent>
            <Brand>
                <Link id="backToHome" to="/home">
                    <Spin indicator={<Logo/>}></Spin>
                </Link>
                <h1>Dynki</h1>
            </Brand>

            <HomeLinks>
                <StyledLink id="pricing" to="/Pricing" match={['/Pricing']} location={location} >Pricing</StyledLink>
                <StyledLink id="login" to="/auth/login" match={['/auth/login', '/home']} location={location}>Log In</StyledLink>
                <StyledLink id="register" to="/auth/signup" match={['/auth/signup', '/auth/domain']} location={location}>Sign Up</StyledLink>
            </HomeLinks>
        </StyledContent>
    )
}

export default withRouter(PreAuthToolbar);