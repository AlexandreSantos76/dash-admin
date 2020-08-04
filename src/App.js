import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import Route from './routes/routes';

import  AppProvider  from './hooks'


function App(){
  return(
    <Router>
      {/* <Routes /> */}
      <AppProvider> 
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} isPrivate/>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" isPrivate />
        </Switch>
      </AppProvider>
    </Router>
  )
}

export default App;