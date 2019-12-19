import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Pricing } from '../../landing';
import { Auth } from '../../auth';
import Footer from '../footer/Footer';
import PreAuthToolbar from './PreAuthToolbar';
    
const PreAuthShell = props => {
    return (
        <div>
            <PreAuthToolbar/>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/pricing" component={Pricing} />
                <Route path={'/auth/*'} component={Auth}></Route>
            </Switch>
            <Footer/>
        </div>
    )
}

export default PreAuthShell;