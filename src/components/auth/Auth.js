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
import { checkDomain, createDomain } from '../../store/actions/domainActions';

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

const Auth = ({ auth, createDomain, checkDomain, domain, location, pending, signIn, signUp }) => {

    if (auth && auth.uid) {
        if (!domain && location.pathname !== '/auth/domain') {
            return <Redirect to='/auth/domain'/>
        }
    }

    const renderLogin = (pending, signIn) => (
        <Login pending={pending} signIn={signIn}/>
    );

    const renderSignUp = (pending, signUp) => (
        <SignUp pending={pending} signUp={signUp}/>
    );

    const renderDomain = (createDomain, checkDomain, domain, pending) => (
        <Domain createDomain={createDomain} checkDomain={checkDomain} domain={domain} pending={pending}/>
    );

    const renderForgot = (forgotPassword, pending) => (
        <Forgot forgotPassword={forgotPassword} pending={pending}/>
    );

    return (
        <Background>
            <StyledContent>
                <Fragment>
                    <Switch>
                        <Route exact path={'/auth/login'} component={() => renderLogin(pending, signIn)}/>
                        <Route exact path={'/auth/signup'} component={() => renderSignUp(pending, signUp)}/>
                        <Route exact path={'/auth/domain'} component={() => renderDomain(createDomain, checkDomain, domain, pending)}/>
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
      pending: state.auth.pending,
      auth: state.firebase.auth,
      domain: state.domain.domainId
    }
}
  
export const mapDispatchToProps = (dispatch) => {
    return {
        checkDomain: (name) => dispatch(checkDomain(name)),
        createDomain: (name) => dispatch(createDomain(name)),
        forgotPassword: (creds) => dispatch(forgotPassword(creds)),
        signIn: (creds) => dispatch(signIn(creds)),
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));