import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';

class App extends Component {

  if (loading) {
    return <p>Loading..</p>;
  }


  render() {
    const { auth } = this.props;

    return (
      <div className="App">
        <SecuredRoute
            path="/"
            component={PostAuthShell}
            authenticated={auth}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
