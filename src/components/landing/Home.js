import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = (props) => {

    return (
        <React.Fragment>
            <div className="home__choice">
                <div className="home__header">
                    <div className="brand">
                        <Link to="/home">
                            <div className="section__img"></div>
                        </Link>
                        <h1>Dynki</h1>
                    </div>
                    <div className="home__links">
                        {/* <Link to="/features">Features</Link> */}
                        <Link to="/Pricing">Pricing</Link>
                        <Link to="/auth/login">Log In</Link>
                        <Link to="/auth/signup">Sign Up</Link>
                    </div>
                </div>

                <div className="home">
                    <section className="home__sample">
                        <div className="home__h1">An elegant way to manage your work load</div>
                        <div className="home__h2">Whether its planning work or tracking orders</div>
                        <div className="home__button">Get Started For Free</div>
                        <img alt="sample" src="./assets/img/sample.png"></img>
                    </section>
                </div>
                <div className="home__section2">
                    <div className="home__section2__h1">Free Project Tracking Software</div>
                    <p className="home__section2__h2">Track everything, use for work or for personal life. Dynki tracking software is effortless and beautiful to use.</p>
                    <p className="home__section2__h2">Create custom boards that allow you to track things your way. With numerous column types you can easily at a glance keep track of everything of importance.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;