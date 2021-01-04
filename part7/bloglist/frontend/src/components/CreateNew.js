import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

import { Button, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  newBlogInput: {
    marginTop: 10,
    width: '100%',
  },
});

const CreateNew = ({ hideAccordion }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNew = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.addNewBlog({ title, author, url });
      hideAccordion();
      setTitle('');
      setAuthor('');
      setUrl('');
      dispatch(createBlog(blog));
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          'success',
          4
        )
      );
    } catch (error) {
      dispatch(
        setNotification(
          'there was an error while adding the blog',
          'error',
          4000
        )
      );
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateNew}>
        <div>
          <TextField
            variant="filled"
            className={classes.newBlogInput}
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            label="title"
          />
          <TextField
            variant="filled"
            className={classes.newBlogInput}
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            label="author"
          />
          <TextField
            variant="filled"
            className={classes.newBlogInput}
            id="url-input"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
            label="url"
          />
        </div>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            id="create-button"
            type="submit"
          >
            create
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateNew;
