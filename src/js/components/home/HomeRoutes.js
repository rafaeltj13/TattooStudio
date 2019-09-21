/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
// import SwitchGuard from '../signin/SwitchGuard';
import Home from './Home';
import AppointmentRoutes from '../appointment/AppointmentRoutes';

const HomeRoutes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/appointment" component={AppointmentRoutes} />
    </Switch>
  );
};

export default withRouter(HomeRoutes);
