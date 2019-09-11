import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Signin from './Signin';
import SignupRoutes from '../signup/SignupRoutes';

const SigninRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={SignupRoutes}/>
      <Redirect to={{ pathname: '/signin' }} />
    </Switch>
  );
};

export default withRouter(SigninRoutes);