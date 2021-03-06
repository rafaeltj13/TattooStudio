import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import SignupCustomer from './SignupCustomer';
import SignupArtist from './SignupArtist';
import SignupOwner from './SignupOwner';

const SignupRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/customer`} component={SignupCustomer} />
      <Route path={`${match.url}/artist`} component={SignupArtist} />
      <Route path={`${match.url}/owner`} component={SignupOwner} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(SignupRoutes);