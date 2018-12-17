import * as React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';

class PreAuthShell extends React.Component {
    render() {
        return <div>
            <div className="domain__choice">
                <div className="brand">
                    <div className="section__img"></div>
                    <h1>Dynki</h1>
                </div>

                <section className="section">
                    <div className="main__form">
                            <Route path={'/auth/login'} component={Login}></Route>
                            <Route path={'/auth/signup'} component={Signup}></Route>
                        </div>
                    <div className="main__pic"></div>
                </section>
            </div>
        </div>
    }
}

export default PreAuthShell;