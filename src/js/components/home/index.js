import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';
import AppBar from '../custom/navigation/CustomAppBar';
import BottomNavigation from '../custom/navigation/CustomBottomNavigation'

const styles = () => ({
  mainContainer: {
    height: '88vh',
    overflow: 'scroll',
  },
});

const Home = ({ classes, sessionToken }) => {
  if (!sessionToken) return <Redirect to="/signin" />;

  return (
    <div className={classes.maxHeight}>
      <AppBar />
      <div className={classes.mainContainer}>
        <HomeRoutes />
        <style>{'body { background-color: #F5F5F5; }'}</style>
      </div>
      <BottomNavigation />
    </div>
  );
};

const mapStateToProps = ({ signin: { sessionToken } }) => ({
  sessionToken
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
