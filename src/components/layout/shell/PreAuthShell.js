import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Login, SignUp, Domain, Forgot } from '../../auth';
import { Spin } from 'antd';

class PreAuthShell extends React.Component {
    render() {
        return <div>
            <div className="domain__choice">
                <div className="home__header">
                    <div className="brand">
                        <Link id="backToHome" to="/home">
                            <Spin indicator={<div className="section__img"></div>}></Spin>
                        </Link>
                        <h1>Dynki</h1>
                    </div>
    
                    <div className="home__links">
                        {/* <Link to="/features">Features</Link> */}
                        <Link to="/Pricing">Pricing</Link>
                        <Link id="login" to="/auth/login">Log In</Link>
                        <Link id="register" to="/auth/signup">Sign Up</Link>
                    </div>
                </div>

                <section className="section">
                    <div className="main__form">
                        <Switch>
                            <Route exact path={'/auth/login'} component={Login}></Route>
                            <Route exact path={'/auth/signup'} component={SignUp}></Route>
                            <Route exact path={'/auth/domain'} component={Domain}></Route>
                            <Route exact path={'/auth/forgot'} component={Forgot}></Route>
                        </Switch>
                    </div>
                    <div className="main__pic"></div>
                </section>
            </div>
        </div>
    }
}

export default PreAuthShell;