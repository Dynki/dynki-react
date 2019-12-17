import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Typography } from 'antd';

const { Paragraph, Title, Text } = Typography;

const StyledWrapper = styles.div`
    display: flex;
    flex-direction: column;
`;

const ProductName = styles.div`
    background-color: ${props => props.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;

    h1 {
        color: #ffffff;
        margin: 0px;
    }
`;

const StyledContent = styles.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    min-width: 300px;
    margin-bottom: 20px;

    border: solid 1px #e0e0e0;
    background-color: #FAFAFA;

    height: 80%;
    padding: 30px;

    // @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
    //     width: 100%;
    //     padding: 30px;
    //     height: 100%;
    //     display: block;
    // }
`;

const StyledLink = styles(Link)`
    margin-top:auto;
    width: 100%;
`;

const StyledButtonLink = styles.div`
    border: solid 2px #3095de;
    color: ${props => props.main ? '#ffffff' : '#3095de'}
    background-color: ${props => props.main ? '#3095de' : '#ffffff'}
    position: absolute;
    bottom:  50px;
    padding: 20px;
    text-align: center;
    font-size: 20px;
    margin-top:auto;

    :hover {
        cursor: pointer;
        background-color: #3095de!important;
        color: #ffffff;
    }
`;

const StyledFeatures = styles.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

const StyledFeature = styles.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    i {
        margin-right: 10px;

        svg {
            fill: #00D084;
        }
    }
`;

const StyledCost = styles.div`
    .ant-typography {
        color: ${props => props.color ? props.color : 'rgba(0, 0, 0, 0.65)'}
    }
`;

const Product = ({ blurb, buttonText, color, cost, description, main, redirectLink, title }) => {
    return (
        <StyledWrapper>
            <ProductName bgColor={color}>
                <Title>{title}</Title>
            </ProductName>
            <StyledContent>
                <Text>{description}</Text>
                <StyledCost color={color}>
                    <Title level={4}>{cost}</Title>
                </StyledCost>
                <Text>Per month</Text>
                <Text strong>Billed monthly</Text>
                <StyledFeatures>
                {blurb.map((b,i) => {
                    return <StyledFeature>
                        <Icon type="check-circle" theme="filled" />
                        <Text key={i}>{b}</Text>
                    </StyledFeature>
                })}
                </StyledFeatures>
                <StyledLink to={redirectLink}>
                    <StyledButtonLink main={main}>{buttonText}</StyledButtonLink>
                </StyledLink>
            </StyledContent>
        </StyledWrapper>
    );
}

export default Product;