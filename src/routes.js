import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom'
import Cloud from './views/Cloud';
import Stream from './views/Stream';
import Dashboard from './layouts/dashboard';


const Routes = () => {
  return (
       <Switch>
          <Route path="/cloud" component={Cloud} />
          <Route path="/stream" component={Stream} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/dashboard" />
       </Switch>
  )
}
export default Routes ;