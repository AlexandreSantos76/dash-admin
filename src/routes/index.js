import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './routes';

import AdminLayout from "../layouts/Admin.js";
import AuthLayout from "../layouts/Auth.js";

function Routes(){
  return(
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} isPrivate />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" isPrivate/>
    </Switch>
  )
}

export default Routes();