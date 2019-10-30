/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './Home';
import SearchRoutes from '../search/SearchRoutes'
import AppointmentRoutes from '../appointment/AppointmentRoutes';
import AboutRoutes from '../about/AboutRoutes';
import ProfileRoutes from '../profile/ProfileRoutes'

const HomeRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchRoutes} />
      <Route path="/appointment" component={AppointmentRoutes} />
      <Route path="/about" component={AboutRoutes} />
      <Route path="/profile" component={ProfileRoutes} />
    </Switch>
  );
};

export default withRouter(HomeRoutes);
