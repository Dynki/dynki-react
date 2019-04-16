import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home = (props) => {

    return (
        <React.Fragment>
            <div className="domain__choice">
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
                        <img alt="sample" src="./assets/img/sample.png"></img>
                    </section>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;