import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import SearchList from './SearchList';

const AppointmentRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={SearchList} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(AppointmentRoutes);