import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import SignupCustomer from './SignupCustomer';

const SignupRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/customer`} component={SignupCustomer} />
      <Redirect to={{ pathname: '/nomatch' }} />
    </Switch>
  );
};

export default withRouter(SignupRoutes);