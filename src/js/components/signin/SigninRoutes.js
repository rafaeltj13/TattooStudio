import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Signin from './Signin';

const SigninRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={'/signin'} component={Signin} />
      <Redirect to={{ pathname: '/nomatch' }} />
    </Switch>
  );
};

export default withRouter(SigninRoutes);