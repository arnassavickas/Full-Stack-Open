import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, resortBlogs, showNotification }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);

  const clickShowHandler = () => {
    setVisible(!visible);
  };

  const clickLikeHandler = async () => {
    await blogService.likeBlog(blog);
    //const updatedBlog = await blogService.getBlog(blog);
    await resortBlogs();
    //setLikes(updatedBlog.likes);
  };

  const clickDeleteHandler = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog);
        resortBlogs();
      } catch (error) {
        if (/401/.test(error)) {
          showNotification('you are not the creator of this blog', 'red', 4000);
        } else if (/500/.test(error)) {
          showNotification(
            'blog is already deleted from the server',
            'red',
            4000
          );
        }
      } finally {
        resortBlogs();
      }
    }
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div id="blog" style={{ border: '1px solid black', margin: '5px 0' }}>
      <div style={hideWhenVisible}>
        <span className={'collapsedTitle'}>{blog.title}</span>{' '}
        <span className={'collapsedAuthor'}>{blog.author}</span>
        <button id="view-blog" onClick={clickShowHandler}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button id="hide-blog" onClick={clickShowHandler}>
            hide
          </button>
        </div>
        <div className={'url'}>{blog.url}</div>
        <div className={'likes'}>
          likes <span id="likes">{likes}</span>
          <button id="like-button" onClick={clickLikeHandler}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button id="remove-button" onClick={clickDeleteHandler}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
