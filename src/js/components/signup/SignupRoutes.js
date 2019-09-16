import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SignupCustomer from './SignupCustomer';
import SignupArtist from './SignupArtist';

const SignupRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/customer`} component={SignupCustomer} />
      <Route path={`${match.url}/artist`} component={SignupArtist} />
      {/* <Redirect to={{ pathname: '/nomatch' }} /> */}
    </Switch>
  );
};

export default withRouter(SignupRoutes);