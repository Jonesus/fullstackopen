import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notification: state.notifications.notification
});

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return <div style={style}>{notification}</div>;
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
