import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PreAuthShell } from './components';
import App from './App';

import { createBrowserHistory } from "history";

export const history = createBrowserHistory()

const Root = ({ store }) => (
    <Provider store={store}>
      <Router history={history}>
        <div>
            <Route path="/" component={App} />
            <Route path="/auth" component={PreAuthShell} />
            <Route path="/home" component={PreAuthShell} />
            <Route path="/pricing" component={PreAuthShell} />
        </div>
      </Router>
    </Provider>
);

export default Root;