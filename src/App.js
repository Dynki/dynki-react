import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setDomain } from './store/actions/authActions'

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      domainLoaded: false
    }
  }

  componentDidMount() {
    this.onSetDomain()
  }

  if (loading) {
    return <p>Loading..</p>;
  }

  onSetDomain() {
    this.props.SetDomain();
    this.setState({ domainLoaded: true })
  }

  render() {
    const { auth, domain } = this.props;

    if (this.state.domainLoaded && domain) {
      console.log('State::DomainLoaded', this.state.domainLoaded);
      return (

        <div className="App">
          <SecuredRoute
              path="/"
              component={PostAuthShell}
              authenticated={auth}
              domain={domain}
          />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    domain: state.domain.domainId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      SetDomain: () => dispatch(setDomain())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
