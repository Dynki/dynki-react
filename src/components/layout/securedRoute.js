import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute ({
  component: Component,
  authenticated,
  domain,
  domainChecked,
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
          (domainChecked ?
            (domain 
              ? location.pathname === '/auth/domain' ? <Redirect to="/"/> : <Component {...props} {...rest} /> 
              : <Redirect to="/auth/domain"/>
            )
            : null
          )
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}