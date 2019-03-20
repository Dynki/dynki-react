import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, SignUp, Domain, Forgot } from '../../auth';
import { Spin } from 'antd';

class PreAuthShell extends React.Component {
    render() {
        return <div>
            <div className="domain__choice">
                <div className="brand">
                    <Spin indicator={<div className="section__img"></div>}></Spin>
                    <h1>Dynki</h1>
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