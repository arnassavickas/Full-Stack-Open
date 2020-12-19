import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    text: null,
    color: null,
  });

  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    if (localUser) {
      const userData = JSON.parse(localUser);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const showNotification = (text, color, time) => {
    setNotification({
      text,
      color,
    });
    setTimeout(() => {
      setNotification({ text: null, color: null });
    }, time);
  };

  return (
    <div>
      <Notification notification={notification} />
      {user ? (
        <Blogs
          user={user}
          setUser={setUser}
          showNotification={showNotification}
        />
      ) : (
        <Login showNotification={showNotification} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
