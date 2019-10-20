import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = (props) => {

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
                        <Link className="login-link-btn" to="/auth/login">Log In</Link>
                        <Link to="/auth/signup">Sign Up</Link>
                    </div>
                </div>

                <section className="pricing">
                    <div className="pricing__header">
                        <div className="pricing__section">
                            <div className="pricing__section__title">Personal</div>
                            <div className="pricing__section__description">Our starter package (free forever)</div>
                            <div className="pricing__section__blurb">Team management</div>
                            <div className="pricing__section__blurb">Unlimited Boards</div>
                            <div className="pricing__section__blurb">Basic Column Types</div>
                            <div className="pricing__section__blurb">Up to 3 users</div>
                            <div className="pricing__section__cost">£Free</div>
                            <div className="pricing__section__cost-basis">GBP / User / Month</div>
                            <Link to="/auth/signup">
                                <div className="pricing__section__button">Get Started Now</div>
                            </Link>
                        </div>
                        <div className="pricing__section pricing__section--main">
                            <div className="pricing__section__title">Business</div>
                            <div className="pricing__section__description">Enhanced package</div>
                            <div className="pricing__section__blurb">All the Personal package plus</div>
                            <div className="pricing__section__blurb">Advanced Column Types</div>
                            <div className="pricing__section__blurb">Up to 10 users</div>
                            <div className="pricing__section__cost">£TBA</div>
                            <div className="pricing__section__cost-basis">GBP / Month</div>
                            <div className="pricing__section__button--main">Coming Soon</div>
                        </div>
                        <div className="pricing__section">
                            <div className="pricing__section__title">Enterprise</div>
                            <div className="pricing__section__description">Premium package</div>
                            <div className="pricing__section__blurb">All the Business package plus</div>
                            <div className="pricing__section__blurb">Flow Types</div>
                            <div className="pricing__section__blurb">Unlimited users</div>
                            <div className="pricing__section__cost">£TBA</div>
                            <div className="pricing__section__cost-basis">GBP / Month</div>
                            <div className="pricing__section__button">Coming Soon</div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default Pricing;