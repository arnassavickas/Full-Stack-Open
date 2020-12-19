import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const clickHandler = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div style={{ border: '1px solid black', margin: '5px 0' }}>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={clickHandler}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={clickHandler}>view</button>
      </div>
    </div>
  );
};

export default Blog;
