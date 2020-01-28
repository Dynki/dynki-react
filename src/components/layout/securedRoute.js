import * as React from "react";
import { Redirect, Route } from "react-router-dom";

const redirect = (pathname, Component) => {
  const urlPart = pathname.split('/')[1] ? pathname.split('/')[1].toLocaleLowerCase() : '';
  const noRedirect = ['home', 'pricing', 'auth', 'terms', 'privacy', 'assets'];
  const redirectionAllowed = noRedirect.indexOf(urlPart) === -1;

  if (urlPart === 'privacy' || urlPart === 'terms') {
    return (
      Component
    )
  }

  return redirectionAllowed ? <Redirect to="/home" /> : null;
}

export default function SecuredRoute ({
  component: Component,
  preAuthComponent: PreAuthComponent,
  authenticated,
  domain,
  domainChecked,
  location,
  signUpInProgress,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated.uid && signUpInProgress === false ? (
          (domainChecked ?
            (domain 
              ? location.pathname === '/auth/domain' ? <Redirect to="/"/> : <Component {...props} {...rest} /> 
              : <Redirect to="/auth/domain"/>
            )
            : null
          )
        ) : (
          signUpInProgress ? 
            null 
            : 
            redirect(location.pathname, <PreAuthComponent {...props} {...rest} />)
        )
      }
    />
  );
}