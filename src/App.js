import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setDomain } from './store/actions/authActions'

import './App.scss';
import { SecuredRoute, PostAuthShell } from './components';
import MainErrorBoundary from './components/core/MainErrorBoundry';

const AppContext = React.createContext({ invite: undefined });

export class App extends Component {

  constructor(props) {
    super(props)


    const params = new URLSearchParams(this.props.location.search);
    const invite = params.get('invite');

    console.log('invite', invite);

    this.state = {
      domainLoaded: false,
      invite
    }
  }

  componentDidMount() {
    this.onSetDomain();
  }

  onSetDomain() {
    this.props.SetDomain();
    this.setState({ domainLoaded: true })
  }

  render() {
    console.log('state invite:', this.state.invite);

    const { auth, domain, domainChecked, location } = this.props;
      return (
        <AppContext.Provider value={this.state.invite}>
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
        </AppContext.Provider>
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
