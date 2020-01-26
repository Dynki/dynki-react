import * as React from "react";
import { Route, Redirect } from "react-router-dom";

const redirect = (pathname) => {
  const urlPart = pathname.split('/')[1] ? pathname.split('/')[1].toLocaleLowerCase() : '';
  const noRedirect = ['home', 'pricing', 'auth'];
  const redirectionAllowed = noRedirect.indexOf(urlPart) === -1;

  return redirectionAllowed ? <Redirect to="/home" /> : null;
}

export default function SecuredRoute ({
  component: Component,
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
            redirect(location.pathname)
        )
      }
    />
  );
}