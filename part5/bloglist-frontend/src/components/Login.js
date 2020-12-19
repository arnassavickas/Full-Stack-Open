import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUsername('');
      setPassword('');
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
      showNotification('logged in successfully', 'green', 4000);
    } catch {
      showNotification('wrong username of password', 'red', 4000);
      console.error('login failed');
    }
  };

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;
