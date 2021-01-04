import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  notification: {
    position: 'absolute',
    top: 90,
    right: 40,
    width: '50%',
  },
}));

const Notification = () => {
  const classes = useStyles();
  const notification = useSelector((state) => state.notification);
/*   if (notification.text === null) {
    return null;
  } */
  return (
    <Fade in={notification.show}>
      <Alert className={classes.notification} severity={notification.severity}>
        {notification.text}
      </Alert>
    </Fade>
  );
};

export default Notification;
