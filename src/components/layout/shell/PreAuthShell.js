import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Pricing } from '../../landing';
import { Auth } from '../../auth';
import Footer from '../footer/Footer';
import Privacy from '../../auth/Privacy';
import PreAuthToolbar from './PreAuthToolbar';
import Terms from '../../auth/Terms';
import BrowserSupport from '../../core/BrowserSupport';
    
const PreAuthShell = props => {
    return (
        <div>
            <PreAuthToolbar/>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/pricing" component={Pricing} />
                <Route path={'/auth/*'} component={Auth}></Route>
                <Route path="/privacy" component={Privacy}></Route>
                <Route path="/terms" component={Terms}></Route>
                <Route path="/unsupported" component={BrowserSupport}></Route>
            </Switch>
            <Footer/>
        </div>
    )
}

export default PreAuthShell;