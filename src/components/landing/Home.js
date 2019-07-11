import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

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
                        <Link to="/auth/signup" id="register">
                            <div className="home__button">Get Started For Free</div>
                        </Link>
                        
                        <img alt="sample" src="./assets/img/sample.png"></img>
                    </section>
                </div>
                <div className="home__section2">
                    <div className="home__section2__h1">Free Project Tracking Software</div>
                    <p className="home__section2__h2">Track everything, use for work or for personal life. Dynki tracking software is effortless and beautiful to use.</p>
                    <p className="home__section2__h2">Create custom boards that allow you to track things your way. With numerous column types you can easily at a glance keep track of everything of importance.</p>
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
                    <Link to="/auth/signup">
                        <div className="home__button">Sign Up For Free</div>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;