import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { login } from './reducers/loginReducer';

import { Container, Typography } from '@material-ui/core';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    if (localUser) {
      const userData = JSON.parse(localUser);
      dispatch(login(userData));
      blogService.setToken(userData.token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!isLoggedIn) {
    return (
      <Container>
        <Header />
        <Notification />
        <Typography variant="h2" gutterBottom>
          blog app
        </Typography>
        <Login />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Notification />
      <Typography variant="h2" gutterBottom>
        blog app
      </Typography>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/">
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
