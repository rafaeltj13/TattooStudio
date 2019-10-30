import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ArtistProfile from './ArtistProfile';

const ProfileRoutes = ({ match }) => {
  return (
    <Switch>
      {/* <Route exact path={`${match.url}/`} component={<Redirect to={{ pathname: '/search' }} />} /> */}
      <Route path={`${match.url}/artist/:id`} component={ArtistProfile} />
      <Redirect to={{ pathname: '/' }} />
    </Switch>
  );
};

export default withRouter(ProfileRoutes);