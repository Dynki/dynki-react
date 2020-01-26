import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Tooltip, Typography } from 'antd';
const { Title, Text } = Typography;

const StyledPicture = styles.img`
    display: block;
    background-image: url(${props => props.imageSource ? props.imageSource : '/assets/img/dog-sm.jpg'}), none;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;  
    width: 100%;
    height: 100%;
`;

const StyledWrapper = styles.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const ProductName = styles.div`
    background-color: ${props => props.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;

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
    min-height: 520px;
    min-width: 300px;
    margin-bottom: 20px;

    border: solid 1px #e0e0e0;
    background-color: #FAFAFA;

    height: 80%;
    padding: 30px;

    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        min-height: 10px;
    }
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

const StyledButtonAnchor = styles.a`
    margin-top:auto;
    width: 100%;
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
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
`;

const StyledFeature = styles.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;

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

const StyledText = styles(Text)`
    margin-right: auto;
    padding-right: 10px;
`;

const HelpIcon = styles(Icon)`
    cursor: pointer;
    font-size: 16px;

    svg {
        fill: #A5A4A4!important;
    }
`;

const CheckIcon = styles(Icon)`
    font-size: 16px;
`;

const Product = ({ billingBasis, billingFrequency, blurb, buttonText, color, cost, description, free, href, imageSource, main, redirectLink, title }) => {
    return (
        <StyledWrapper>
            <ProductName bgColor={color}>
                <StyledPicture imageSource={imageSource}/>
            </ProductName>
            <StyledContent>
                <Title level={3}>{title}</Title>
                <Text>{description}</Text>
                <StyledCost color={color}>
                    <Title level={4}>{cost}</Title>
                </StyledCost>
                <Text>{billingBasis}</Text>
                <Text strong>{billingFrequency}</Text>
                <StyledFeatures>
                {blurb.map((feature,i) => {
                    return <StyledFeature key={i}>
                        <CheckIcon type="check-circle" theme="filled" />
                        <StyledText>{feature.name}</StyledText>
                        <Tooltip title={feature.description}>
                            <HelpIcon type="question-circle" />
                        </Tooltip>
                    </StyledFeature>
                })}
                </StyledFeatures>
                {href ? 
                    <StyledButtonAnchor href={href}>{buttonText}</StyledButtonAnchor>
                    :
                    <StyledLink to={redirectLink}>
                        <StyledButtonLink main={main}>{buttonText}</StyledButtonLink>
                    </StyledLink>
                }
            </StyledContent>
        </StyledWrapper>
    );
}

export default Product;