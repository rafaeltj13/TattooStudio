/* Copyright (C) 2019 Universidade Federal de Campina Grande (UFCG) */

import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './Home'
// import SwitchGuard from '../signin/SwitchGuard';

const HomeRoutes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(HomeRoutes);
