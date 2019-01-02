import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute ({
  component: Component,
  authenticated,
  ...rest
}) {
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated.uid ? (
          (authenticated.domainId ? <Component {...props} {...rest} /> : <Redirect to="/auth/domain"/>)
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}