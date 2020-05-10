import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const StyledContent = styles.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 740px;
`;

const Hero = styles.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #BDB9B8;
    background-image: linear-gradient(177deg, #bdb9b8 0%, #d8d7da 62%);
`;

const SampleSection = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding: 50px;
    padding-top: 25px;

    img {
        border-radius: 3px;
        width: 85%;
        box-shadow: -2px 1px 17px 1px rgba(0,0,0,0.25);
        -webkit-box-shadow: -2px 1px 17px 1px rgba(0,0,0,0.25);
        -moz-box-shadow: -2px 1px 17px 1px rgba(0,0,0,0.25);
    }

    h1 {
        color: #414141;

        font-family: $font-family;
        font-size: 28px;
        font-weight: 600;

        margin-bottom: 15px;
    }

    h2 {
        color: #414141;

        font-family: $font-family;
        font-size: 18px;

        margin-bottom: 15px;
    }

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 100%;

        h1 {
            text-align: center;
        }

        img {
            width: 105%;
            box-shadow: -2px 1px 17px 6px rgba(0,0,0,0.25);
            -webkit-box-shadow: -2px 1px 17px 6px rgba(0,0,0,0.25);
            -moz-box-shadow: -2px 1px 17px 6px rgba(0,0,0,0.25);
        }

    }
`;

const GettingStartedButton = styles.button`
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    background-color: #2E84C2;
    border: none;
    padding: 15px;
    color: #fff;
    font-size: 20px;
    margin-bottom: 24px;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #489EDC;
    }
`;

const ButtonSubtext = styles.div`
    margin-bottom: 0px;
    color: #ffffff;
    font-size: 14px;
`;

const Home = props => {

    return (
        <StyledContent>
            <Hero>
                <SampleSection>
                    <h1>An elegant way to manage your work load</h1>
                    <h2 className="home__h2">Whether its planning work or tracking orders</h2>
                    <Link to="/Pricing" id="register">
                        <GettingStartedButton
                        >
                            Click Here to Get Started<ButtonSubtext>No credit card required</ButtonSubtext>
                        </GettingStartedButton>
                        
                    </Link>
                    
                    <img alt="sample" src="./assets/img/sample.png"></img>
                </SampleSection>
            </Hero>
            <div className="home__section2">
                <div className="home__section2__h1">Free Task Management Software</div>
                <p className="home__section2__h2">Track everything, use for work or for personal life. Dynki task management software is effortless and beautiful to use.</p>
                <p className="home__section2__h2">Create custom boards that allow you to track things your way. With numerous column types you can easily manage of everything of importance.</p>
            </div>
            <div className="home__section3">
                <div className="home__section3__container">
                    <div className="home-container">
                        <Icon type="project" />
                        <div className="h1">Project Management</div>
                        <p className="h2">Use boards to organise project priorities, and assign tasks to resources</p>
                    </div>
                    <div className="home-container">
                        <Icon type="code" />
                        <div className="h1">Software Development</div>
                        <p className="h2">Plan and keep track of your agile software development projects. Organise and prioritise user stories.</p>
                    </div>
                    <div className="home-container">
                        <Icon type="area-chart" />
                        <div className="h1">Sales Pipelines</div>
                        <p className="h2">Create pipelines that allow you to focus on the actions that get deals closed.</p>
                    </div>
                </div>
                <Link to="/Pricing">
                    <GettingStartedButton>Sign Up For Free <ButtonSubtext>No credit card required</ButtonSubtext></GettingStartedButton>
                </Link>
            </div>
        </StyledContent>
    )
}

export default Home;