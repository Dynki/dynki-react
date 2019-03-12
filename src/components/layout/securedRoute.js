import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute ({
  component: Component,
  authenticated,
  domain,
  location,
  ...rest
}) {
  console.log('Authenticated::', authenticated);
  console.log('Domain::', domain);
  console.log('Location::', location);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated.uid ? (
          (domain 
            ? location.pathname === '/auth/domain' ? <Redirect to="/"/> : <Component {...props} {...rest} /> 
            : <Redirect to="/auth/domain"/>
          )
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}