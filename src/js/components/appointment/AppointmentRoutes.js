import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import AppointmentValidation from './process/AppointmentValidation';
import AppointmentConfirmation from './process/AppointmentConfirmation';

const SignupRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={AppointmentList} />
      <Route path={`${match.url}/create/:id`} component={AppointmentValidation} />
      <Route path={`${match.url}/create`} component={AppointmentForm} />
      <Route path={`${match.url}/confirm/:id`} component={AppointmentConfirmation} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(SignupRoutes);