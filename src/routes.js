import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './layouts/dashboard';
import Login from './layouts/login';
import PageNotFound from './layouts/pageNotFound';
import { useAuthState } from './contexts/authenticationProvider';

const PublicRoutes = ({component,...rests }) => {
  const context = useAuthState();
  return (
    <Route 
    {...rests }
    render={function(props){
      if(sessionStorage.getItem("isAuthentication")){
        return <Redirect 
        to={{
          pathname:"/",
          state: {
            from: props.location ,
              }
            }}
            />
          }else{
            return React.createElement(component, props)
          }
        }}
        />
        )
      }
      const PrivateRoutes = ({ component , token,...rests }) => {
        const context = useAuthState();
        return (
          <Route 
          {...rests}
          render={function(props){
            if(sessionStorage.getItem("isAuthentication")){
              return React.createElement(component, props);
            }else{
              return <Redirect 
              to={{
                pathname:"/login",
                state:{
                  from: props.location
                }
              }}
          />
        }
      }}
    />
  )
}

const Routes = (props) => {  
  return (
    <Switch>
          <Redirect  exact from="/" to="/dashboard" />
          <PrivateRoutes  path="/dashboard" component={Dashboard} />
          <PublicRoutes path="/login" component={Login} />
          <Route component={ PageNotFound } />
       </Switch>
  )
}
export default Routes ;