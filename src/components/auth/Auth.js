import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import styles from 'styled-components';
import Media from 'react-media';

import Login from './login/Login';
import SignUp from './signup/SignUp';
import Domain from './domain/Domain';
import Forgot from './forgot/Forgot';

import { forgotPassword, signIn, signUp } from '../../store/actions/authActions';
import { checkDomain, updateDomain } from '../../store/actions/domainActions';

const Background = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #BDB9B8;
    background-image: linear-gradient(177deg, #bdb9b8 0%, #d8d7da 62%);
    padding: 26px;
    min-height: calc(100vh - 80px);
`;

const StyledContent = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 70%;

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 0px) and (max-device-width : 680px) {
        width: 100%;
    }
`;

const StyledPicture = styles.img`
    display: block;
    background-image: url(/assets/img/dog-sm.jpg), none;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;  
    width: 100%;
    height: 600px;
`;

const Auth = ({ auth, basePending, countryCode, countryCodes, updateDomain, checkDomain, domain, domainChecked, location, pending, signIn, signUp, signUpInProgress }) => {

    if (auth && auth.uid && !signUpInProgress) {
        if (!domain && domainChecked && location.pathname !== '/auth/domain') {
            return <Redirect to='/auth/domain'/>
        }
    }

    const renderLogin = (pending, signIn) => (
        <Login pending={pending} signIn={signIn}/>
    );

    const renderSignUp = (pending, signUp) => (
        <SignUp countryCodes={countryCodes} pending={pending} signUp={signUp}/>
    );

    const renderDomain = (updateDomain, checkDomain, domain, pending) => (
        <Domain updateDomain={updateDomain} checkDomain={checkDomain} domain={domain} pending={pending}/>
    );

    const renderForgot = (forgotPassword, pending) => (
        <Forgot forgotPassword={forgotPassword} pending={pending}/>
    );

    const onSignUp = (creds, packageName, country, region, VATNumber) => {
        country = country === undefined ? countryCode : country;

        signUp(creds, packageName, country, region, VATNumber)
    }

    return (
        <Background>
            <StyledContent>
                <Fragment>
                    <Switch>
                        <Route exact path={'/auth/login'} component={() => renderLogin(pending, signIn)}/>
                        <Route path={'/auth/signup'} component={() => renderSignUp(pending, onSignUp)}/>
                        <Route exact path={'/auth/domain'} component={() => renderDomain(updateDomain, checkDomain, domain, basePending)}/>
                        <Route exact path={'/auth/forgot'} component={() => renderForgot(forgotPassword, pending)}/>
                    </Switch>

                    <Media queries={{
                        medium: "(min-width: 600px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                        }}>
                        {matches => (
                            <React.Fragment>
                                {matches.medium && <StyledPicture/>}
                                {matches.large && <StyledPicture/>}
                            </React.Fragment>
                        )}
                    </Media>
                </Fragment>
            </StyledContent>
        </Background>
    )
}

export const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      signUpInProgress: state.auth.signUpInProgress,
      pending: state.auth.pending,
      basePending: state.base.progress,
      auth: state.firebase.auth,
      domain: state.domain.domainId,
      domainChecked: state.domain.domainChecked,
      countryCode: state.core.countryCode,
      countryCodes: state.core.countryCodes
    }
}
  
export const mapDispatchToProps = (dispatch) => {
    return {
        checkDomain: (name) => dispatch(checkDomain(name)),
        updateDomain: (name) => dispatch(updateDomain(name)),
        forgotPassword: (creds) => dispatch(forgotPassword(creds)),
        signIn: (creds) => dispatch(signIn(creds)),
        signUp: (creds, packageName, countryCode, region, VATNumber) => dispatch(signUp(creds, packageName, countryCode, region, VATNumber))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));