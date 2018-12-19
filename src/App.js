import React, { Component } from 'react';
import './App.scss';
import SecuredRoute from './shell/components/securedRoute';
import Shell from './shell/components/shell';
import { connect } from 'react-redux'

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
            component={Shell}
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
