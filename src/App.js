import React, { Component } from 'react';
import './App.scss';
import SecuredRoute from './shell/components/securedRoute';
import Shell from './shell/components/shell';

class App extends Component {
  state = { loading: false, authenticated: false, user: null };

  if (loading) {
    return <p>Loading..</p>;
  }

  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <SecuredRoute
            exact
            path="/"
            component={Shell}
            authenticated={authenticated}
        />
      </div>
    );
  }
}

export default App;
