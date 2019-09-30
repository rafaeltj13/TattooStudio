import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

const SignupRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={AppointmentList} />
      <Route path={`${match.url}/create`} component={AppointmentForm} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(SignupRoutes);