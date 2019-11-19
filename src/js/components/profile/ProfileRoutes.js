import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ArtistProfile from './ArtistProfile';
import StudioProfile from './StudioProfile';

const ProfileRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/artist/:id`} component={ArtistProfile} />
      <Route path={`${match.url}/studio/:id`} component={StudioProfile} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(ProfileRoutes);