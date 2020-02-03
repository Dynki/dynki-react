import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { detectBrowser } from '../core/BrowserSupport';

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

const isPreAuthRoute = (pathname) => {
  const urlPart = pathname.split('/')[1] ? pathname.split('/')[1].toLocaleLowerCase() : '';
  const preAuthRoutes = ['home', 'pricing', 'auth', 'terms', 'privacy'];
  return  preAuthRoutes.indexOf(urlPart) > -1;
}

const redirectUnsupported = (pathname, component) => {
  if (pathname === '/unsupported') {
    return component;
  }

  return <Redirect to="/unsupported" />;

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
  const browser = detectBrowser();
  return (

    <Route
      {...rest}
      render={props =>
        !browser.supported ? redirectUnsupported(location.pathname, <PreAuthComponent {...props} {...rest} />) :
        authenticated.uid && signUpInProgress === false ? (
          (domainChecked ?
            (domain 
              ? (isPreAuthRoute(location.pathname) ? <Redirect to="/"/> : <Component {...props} {...rest} />)
              : <Redirect to="/auth/domain"/>
            )
            : null
          )
        ) : (
          redirect(location.pathname, <PreAuthComponent {...props} {...rest} />)
        )
      }
    />
  );
}