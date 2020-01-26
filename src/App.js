import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setDomain } from './store/actions/authActions';
import { setInvite } from './store/actions/baseActions';
import { obtainCountryCode } from './store/actions/coreActions';

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';
import MainErrorBoundary from './components/core/MainErrorBoundry';

export class App extends PureComponent {

  componentDidMount() {
    this.onSetInvite();
    this.onSetDomain();
    this.props.ObtainCountryCode();
  }

  onSetInvite() {
    const params = new URLSearchParams(this.props.location.search);
    const inviteId = params.get('invite');
    const inviteName = params.get('invitename');

    if (inviteId) {
      this.props.setInvite({ inviteId, inviteName });
    }
  }

  onSetDomain() {
    this.props.SetDomain();
    this.setState({ domainLoaded: true });
  }

  resetInvite = () => {
    this.setState({ inviteId: undefined, inviteName: undefined });
  }

  render() {
    const { auth, domain, domainChecked, location, signUpInProgress } = this.props;

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
                  signUpInProgress={signUpInProgress}
              />
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
      setInvite: value => dispatch(setInvite(value)),
      ObtainCountryCode: () => dispatch(obtainCountryCode())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
