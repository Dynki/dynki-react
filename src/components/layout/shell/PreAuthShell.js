import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, SignUp, Domain, Forgot } from '../../auth';
import { Home, Pricing } from '../../landing';
import Footer from '../footer/Footer';
import PreAuthToolbar from './PreAuthToolbar';
    
const PreAuthShell = props => {
    return (
        <div>
            <PreAuthToolbar/>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/pricing" component={Pricing} />
                <Route exact path={'/auth/login'} component={Login}></Route>
                <Route exact path={'/auth/signup'} component={SignUp}></Route>
                <Route exact path={'/auth/domain'} component={Domain}></Route>
                <Route exact path={'/auth/forgot'} component={Forgot}></Route>
            </Switch>
            <Footer/>
        </div>
    )
}

export default PreAuthShell;