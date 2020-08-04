import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { useAuth } from '../hooks/auth';

export default function RouteWrapper({
  isPrivate,
  component: Component,
  ...rest
}) {

  const auth = useAuth();


  // const signed = !!auth.user;
  const signed = true;

  if (!signed && isPrivate) {
    return <Redirect to="/auth/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: Proptypes.bool,
  component: Proptypes.oneOfType([Proptypes.element, Proptypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};