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
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}