import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setDomain } from './store/actions/authActions';
import { obtainCountryCode } from './store/actions/coreActions';

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';
import MainErrorBoundary from './components/core/MainErrorBoundry';
import AppContext from './context/appContext';

export class App extends Component {

  constructor(props) {
    super(props)

    const params = new URLSearchParams(this.props.location.search);
    const invite = params.get('invite');
    const inviteName = params.get('invitename');

    this.state = {
      domainLoaded: false,
      invite,
      inviteName
    }
  }

  componentDidMount() {
    this.onSetDomain();
    this.props.ObtainCountryCode();
  }

  onSetDomain() {
    this.props.SetDomain();
    this.setState({ domainLoaded: true })
  }

  resetInvite = () => {
    this.setState({ invite: undefined, inviteName: undefined });
  }

  render() {
    const { auth, domain, domainChecked, location, signUpInProgress } = this.props;

      return (
          <MainErrorBoundary>
            <div className="App">
              <AppContext.Provider value={{ 
                invite: this.state.invite,
                inviteName: this.state.inviteName,
                resetInvite: this.resetInvite
              }}>
              <SecuredRoute
                  path="/"
                  location={location}
                  component={PostAuthShell}
                  authenticated={auth}
                  domain={domain}
                  domainChecked={domainChecked}
                  signUpInProgress={signUpInProgress}
              />
                </AppContext.Provider>
            </div>
          </MainErrorBoundary> 
      );
  }
}

export const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    signUpInProgress: state.auth.signUpInProgress,
    domain: state.domain.domainId,
    domainChecked: state.domain.domainChecked
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
      SetDomain: () => dispatch(setDomain()),
      ObtainCountryCode: () => dispatch(obtainCountryCode())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
