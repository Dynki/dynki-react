import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PreAuthShell } from './components';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/auth" component={PreAuthShell} />
        </div>
      </Router>
    </Provider>
);

export default Root;