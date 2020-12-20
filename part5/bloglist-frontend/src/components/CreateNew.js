import React, { useState } from 'react';
import blogService from '../services/blogs';

const CreateNew = ({ blogs, setBlogs, showNotification, blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNew = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.addNewBlog({ title, author, url });
      blogFormRef.current.toggleVisibility();
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(blog));
      showNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'green',
        4000
      );
    } catch (error) {
      showNotification('there was an error while adding the blog', 'red', 4000);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          <label>
            title:
            <input
              id="title-input"
              type="text"
              value={title}
              name="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              id="author-input"
              type="text"
              value={author}
              name="Author"
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              id="url-input"
              type="text"
              value={url}
              name="url"
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
