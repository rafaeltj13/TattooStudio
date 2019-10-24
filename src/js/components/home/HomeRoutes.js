/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './Home';
import AppointmentRoutes from '../appointment/AppointmentRoutes';
import AboutRoutes from '../about/AboutRoutes';

const HomeRoutes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/appointment" component={AppointmentRoutes} />
      <Route path="/about" component={AboutRoutes} />
    </Switch>
  );
};

export default withRouter(HomeRoutes);
