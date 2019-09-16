import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

const styles = () => ({
  mainContainer: {
    marginTop: '80px',
    width: '100%',
  },
});

const Home = ({ classes, logged }) => {
  if (!logged) return <Redirect to="/signin" />;

  return (
    <div>
      {/* <BottomNavigation /> */}
      <div className={classes.mainContainer}>
        <HomeRoutes />
        <style>{'body { background-color: #F5F5F5; }'}</style>
      </div>
    </div>
  );
};

const mapStateToProps = ({ signin: { logged } }) => ({
  logged
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
