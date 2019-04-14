import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = (props) => {

    return (
        <React.Fragment>
            <div className="domain__choice">
                <div className="home__header">
                    <div className="brand">
                        <div className="section__img"></div>
                        <h1>Dynki</h1>
                    </div>
                    <div className="home__links">
                        <Link to="/features">Features</Link>
                        <Link to="/Pricing">Pricing</Link>
                        <Link to="/auth/login">Log In</Link>
                        <Link to="/auth/signup">Sign Up</Link>
                    </div>
                </div>

                <section className="home__sample">
                    <div className="home__sample__h1">
                    
                    </div>
                    <img alt="sample" src="./assets/img/sample.png"></img>
                </section>
            </div>
        </React.Fragment>
    )
}

export default Home;