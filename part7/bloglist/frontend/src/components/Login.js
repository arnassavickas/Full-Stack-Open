import React from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/useField';
import {
  Typography,
  Button,
  TextField,
  Box,
  FormGroup,
} from '@material-ui/core';

const Login = () => {
  const dispatch = useDispatch();
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value,
      });
      username.setValue('');
      password.setValue('');
      dispatch(login(user));
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
      dispatch(setNotification('logged in successfully', 'success', 4));
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error', 4));
      console.error('login failed');
    }
  };

  return (
    <div>
      <Typography variant="h4">login to application</Typography>
      <Box maxWidth={300}>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <TextField variant="filled" id="username" {...username.input} />
            <TextField variant="filled" id="password" {...password.input} />
            <Button
              variant="outlined"
              color="primary"
              id="login-button"
              type="submit"
            >
              login
            </Button>
          </FormGroup>
        </form>
      </Box>
    </div>
  );
};

Login.propTypes = {};

export default Login;
