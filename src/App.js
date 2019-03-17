import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setDomain } from './store/actions/authActions'

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';
import MainErrorBoundary from './components/core/MainErrorBoundry';

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      domainLoaded: false
    }
  }

  componentDidMount() {
    this.onSetDomain()
  }

  onSetDomain() {
    this.props.SetDomain();
    this.setState({ domainLoaded: true })
  }

  render() {
    const { auth, domain, domainChecked, location } = this.props;
    console.log('App.js::Render::', domain);

      return (
        <MainErrorBoundary>
          <div className="App">
            <SecuredRoute
                path="/"
                location={location}
                component={PostAuthShell}
                authenticated={auth}
                domain={domain}
                domainChecked={domainChecked}
            />
          </div>
        </MainErrorBoundary> 
      );
  }
}

export const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    domain: state.domain.domainId,
    domainChecked: state.domain.domainChecked
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
      SetDomain: () => dispatch(setDomain())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
