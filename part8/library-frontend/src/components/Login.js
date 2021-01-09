import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      setUsername('');
      setPassword('');
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('library-part8', token);
      props.setPage();
    } //eslint-disable-next-line
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    console.log('login...');

    login({
      variables: { username, password },
    });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;
