import React from 'react';
import { Typography } from 'antd';
import styles from 'styled-components';

import ProductOfferings from './ProductOfferings';
import Product from './Product';

const { Title } = Typography;

const StyledContent = styles.div`
    display: flex;
    width: 100vw;
    min-height: 740px;
    background-color: #BDB9B8;
    background-image: linear-gradient(177deg, #bdb9b8 0%, #d8d7da 62%);
    padding-top: 26px;

    &::after {
        min-height: 740px;
        width: 100vw;
        content: "";
        background-color: #BDB9B8;
        background-image: linear-gradient(177deg, #bdb9b8 0%, #d8d7da 62%);

        background-size:     cover;
        background-repeat:   no-repeat;
        background-position: center center;  
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;   

        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }
    
    h2 {
        color: #414141;
    }
`;

const StyledH2 = styles.h2`
    color: #414141;
    font-family: "Raleway", "Roboto" !important;
    -webkit-font-feature-settings: "lnum";
    -moz-font-feature-settings: "lnum";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'lnum' 1;
    font-size: 18px;
    margin-bottom: 15px;
`;

const GettingStartedButton = styles.div`
    background-color: #2E84C2;
    padding: 15px;
    color: #fff;
    font-size: 20px;
    margin-bottom: 24px;
    cursor: pointer;
    min-width: 150px;
    text-align: center;

    :hover {
        background-color: #489EDC;
    }

    
`;

const Products = styles.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: center;

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

const Pricing = props => {

    const products = [
        {
            buttonText: 'Sign up for free',
            color: '#2C82C1',
            cost:`Free for 1 user`,
            features: ['Unlimited Boards', 'Basic Column Types'],
            free: true,
            link: '/auth/signup?package=personal&users=1',
            imageSource: '/assets/img/personal.jpg',
            mainPackage: true,
            name: 'Personal'
        },
        {
            color: '#FCB900',
            name: 'Business',
            features: ['Team Management', 'Unlimited Boards', 'Basic Column Types'],
            link: `/auth/signup?package=business&users=1`,
            cost:`£5.99`,
            mainPackage: false,
            buttonText: 'Start free trial'
        },
        {
            color: '#9900EF',
            name: 'Enterprise',
            features: ['Team Management', 'Unlimited Boards', 'Basic Column Types', 'Advanced Column Types', 'Tags', 'Flow Types'],
            link: `/auth/signup?package=enterprise&users=1`,
            imageSource: '/assets/img/enterprise.jpg',
            cost: 'Contact us',
            mainPackage: false,
            buttonText: 'Contact us'
        }
    ]

    return (
        <React.Fragment>
            <StyledContent>
                <ProductOfferings>
                    <Title level={2}>Start your free trial</Title>
                    <StyledH2>No credit card required</StyledH2>

                    <Products>
                        {products.map(({ buttonText, color, cost, description, features, free, imageSource ,link, mainPackage, name }, i) => {
                            return <Product
                                key={i}
                                blurb={features}
                                buttonText={buttonText}
                                color={color}
                                cost={cost}
                                description={description}
                                free={free}
                                imageSource={imageSource}
                                main={mainPackage}
                                redirectLink={link}
                                title={name}
                            />
                        })}
                    </Products>
                </ProductOfferings>
            </StyledContent>
        </React.Fragment>
    )
}

export default Pricing;