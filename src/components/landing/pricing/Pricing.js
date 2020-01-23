import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import styles from 'styled-components';

import ProductOfferings from './ProductOfferings';
import Product from './Product';

const { Title, Text } = Typography;

const StyledContent = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    // font-family: "Raleway", "Roboto" !important;
    font-size: 18px;
    margin-bottom: 15px;
`;

const Products = styles.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: center;

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 1000px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

const StyledText = styles(Text)`
    margin: 10px;
`;

const Pricing = ({ country, countryCode }) => {

    if (!country) {
        return null;
    }

    const products = Object.freeze({ personal: 'Personal', business: 'Business', enterprise: 'Enterprise' });

    const features = [
        { 
            name: '30 days Business Trial', 
            description: 'Create as many task boards as you like',
            products: [products.personal]
        }, { 
            name: 'Unlimited Boards', 
            description: 'Create as many task boards as you like',
            products: [products.personal, products.business, products.enterprise]
        }, {
            name: 'Standard Column Types',
            description: 'E.g. Text, Number, Date, List',
            products: [products.personal, products.business, products.enterprise]
        }, {
            name: 'Advanced Column Types',
            description: 'E.g. Due By, Percentage, Timer',
            products: [products.business, products.enterprise]
        }, {
            name: 'Team Management',
            description: 'Create/manage teams of users',
            products: [products.business, products.enterprise]
        }, {
            name: 'User Groups',
            description: 'Assign users roles via groups',
            products: [products.business, products.enterprise]
        }, {
            name: 'Board Permissions',
            description: 'Restrict which groups have access to boards',
            products: [products.business, products.enterprise]
        }, {
            name: 'Tags',
            description: 'Create lists that can be used across boards',
            products: [products.enterprise]
        }, {
            name: 'Flow Types',
            description: 'Create workflows that are tailored to your needs',
            products: [products.enterprise]
        }
    ];

    const getPrice = (country) => {
        const price = '3.99';
        const currency = country.country_code === 'GB' ? '£' : country.continent_code === 'EU' ? '€' : '$';
        const suffix = currency === '$' ? '' : '*';

        return `${currency}${price}${suffix}`;
    }

    console.log('Country', country);

    const businessPrice = getPrice(country);

    const packages = [
        {
            buttonText: 'Sign up for free',
            color: '#2C82C1',
            cost:`Free for 1 user`,
            features: features.filter(f => f.products.includes(products.personal)),
            billingBasis: 'Free user/month',
            billingFrequency: 'Free forever',
            link: `/auth/signup/personal?country=${countryCode}`,
            imageSource: '/assets/img/personal.jpg',
            mainPackage: true,
            name: 'Personal'
        },
        {
            color: '#FCB900',
            name: 'Business',
            features: features.filter(f => f.products.includes(products.business)),
            billingBasis: 'Per user/month',
            billingFrequency: 'Billed monthly',
            link: `/auth/signup/business?country=${countryCode}`,
            cost: businessPrice,
            mainPackage: false,
            buttonText: 'Start free trial'
        },
        {
            color: '#9900EF',
            name: 'Enterprise',
            features: features.filter(f => f.products.includes(products.enterprise)),
            billingBasis: 'Per user/month',
            billingFrequency: 'Billed monthly',
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
                        {packages.map(({ billingBasis, billingFrequency, buttonText, color, cost, description, features, free, imageSource ,link, mainPackage, name }, i) => {
                            return <Product
                                key={i}
                                billingBasis={billingBasis}
                                billingFrequency={billingFrequency}
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
                {country && country.continent_code === 'EU' ? 
                    <StyledText strong>*All prices exclude VAT</StyledText>
                    : null
                }
            </StyledContent>
        </React.Fragment>
    )
}

export const mapStateToProps = (state) => {
    return {
        countryCode: state.core.countryCode,
        country: state.core.country
    }
}

export default connect(mapStateToProps)(Pricing);