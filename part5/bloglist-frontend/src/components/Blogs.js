import React, { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import Togglable from './Togglable';
import CreateNew from './CreateNew';
import blogService from '../services/blogs';


const Blogs = ({ user, setUser, showNotification }) => {
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    (async function fetchData() {
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    })();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    showNotification('logout successful', 'green', 4000);
    setUser(null);
  };

  const resortBlogs = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  return (
    <div>
      <h2>blogs</h2>
      <label>
        logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </label>
      <br />
      <br />
      <Togglable buttonLabel={'create new'} ref={blogFormRef}>
        <CreateNew
          blogs={blogs}
          setBlogs={setBlogs}
          showNotification={showNotification}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <div id="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            resortBlogs={resortBlogs}
            showNotification={showNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
