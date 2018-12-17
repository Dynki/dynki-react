import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute ({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}