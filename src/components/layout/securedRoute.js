import * as React from "react";
import { Route, Redirect } from "react-router-dom";

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
          null
          // signUpInProgress ? 
          //   null 
          //   : 
            // location.pathname !== '/home' ? <Redirect to="/home" /> : null
        )
      }
    />
  );
}