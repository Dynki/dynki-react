import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute ({
  component: Component,
  authenticated,
  domain,
  ...rest
}) {
  console.log('Authenticated::', authenticated);
  console.log('Domain::', domain);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated.uid ? (
          (domain ? <Component {...props} {...rest} /> : <Redirect to="/auth/domain"/>)
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}