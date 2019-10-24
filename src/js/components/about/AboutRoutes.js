import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import About from './About';

const AboutRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={About} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(AboutRoutes);