import React, { useState } from 'react';
import { Typography } from 'antd';
import styles from 'styled-components';

import PreAuthToolbar from '../../layout/shell/PreAuthToolbar';
import PricingUsers from './PricingUsers';
import ProductOfferings from './ProductOfferings';
import Product from './Product';
import Footer from '../../layout/footer/Footer';

const { Title } = Typography;

const StyledContent = styles.div`
    display: grid;
    grid-template-rows: 1fr 5fr 0.5fr;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "section" "section2" "footer";
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    min-height: 740px;

    &::after {
        min-height: 740px;
        height: 100vh;
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
        height: 1400px;
    }
`;

const Pricing = props => {

    const [ numberOfUsers, setNumberOfUsers ] = useState('2');
    const userChoice = ['2', '5', '10', '15', '25', '50', '100', '200', '10000'];

    const pricingTiers = {
        personal: ['Free for 2 users ', '£5.99', '£7.99', '£10.99', '£15.99', '£22.99', '£32.99', '£46.99', 'Contact us'],
        business: ['£10.99', '£14.99', '£20.99', '£29.99', '£43.99', '£62.99', '£90.99', '£130.99']
    }

    const products = [
        {
            buttonText: 'Get started',
            color: '#2C82C1',
            cost:`${pricingTiers.personal[userChoice.findIndex(c => c === numberOfUsers)]}`,
            features: ['Team Management', 'Unlimited Boards', 'Basic Column Types'],
            link: '/auth/signup?package=personal&users=1',
            mainPackage: true,
            name: 'Personal'
        },
        {
            color: '#FCB900',
            name: 'Business',
            features: ['Team Management', 'Unlimited Boards', 'Basic Column Types', 'Advanced Column Types', 'Tags'],
            link: `/auth/signup?package=business&users=${numberOfUsers}`,
            cost:`Coming soon`,
            mainPackage: false,
            buttonText: 'Coming soon'
        },
        {
            color: '#9900EF',
            name: 'Enterprise',
            features: ['Team Management', 'Unlimited Boards', 'Basic Column Types', 'Advanced Column Types', 'Tags', 'Flow Types'],
            link: `/auth/signup?package=business&users=${numberOfUsers}`,
            cost: 'Contact us',
            mainPackage: false,
            buttonText: 'Contact us'
        }
    ]

    return (
        <React.Fragment>
            <StyledContent>
                <PreAuthToolbar/>
                <ProductOfferings>
                    <Title level={2}>Start your free trial</Title>
                    <StyledH2>No credit card required</StyledH2>
                    <GettingStartedButton>Get started</GettingStartedButton>

                    <PricingUsers onSetUserCount={setNumberOfUsers}/>
                    <Products>
                        {products.map(({ buttonText, color, cost, description, features, link, mainPackage, name }, i) => {
                            return <Product
                                key={i}
                                blurb={features}
                                buttonText={buttonText}
                                color={color}
                                cost={cost}
                                description={description}
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