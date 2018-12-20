import * as React from 'react';
import { Route } from 'react-router-dom';
import { Login, SignUp } from '../../auth';


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
                            <Route path={'/auth/signup'} component={SignUp}></Route>
                        </div>
                    <div className="main__pic"></div>
                </section>
            </div>
        </div>
    }
}

export default PreAuthShell;