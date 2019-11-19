import React from 'react';
import { connect } from 'react-redux';
import CustomSnackbar from './CustomSnackbar';

const Notification = ({ notifications }) => (
  <div>
    {notifications.map(notification => (
      <CustomSnackbar
        key={notification.id}
        message={notification.message}
        variant={notification.variant}
      />
    ))}
  </div>
);

const mapStateToProps = ({ notification: { data } }) => ({
  notifications: data
});

export default connect(mapStateToProps)(Notification);