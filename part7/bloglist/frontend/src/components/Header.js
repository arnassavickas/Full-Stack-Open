import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { AppBar, Toolbar, Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    textAlign: 'right',
    flexGrow: 1,
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(setNotification('logout successful', 'success', 4));
    dispatch(logout());
    history.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.login}>not logged in</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users/">
            users
          </Button>
          <Typography className={classes.login}>
            logged in as {isLoggedIn.name}
            <Box component={'span'} ml={2}>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
