import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer';
import { useField } from '../hooks/useField';
import {
  Typography,
  Paper,
  Link,
  Button,
  IconButton,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  commentButton: {
    height: 48,
    marginLeft: 5,
  },
});

const Blog = ({ blog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const comment = useField('text', 'comment');

  const clickLikeHandler = async () => {
    dispatch(likeBlog(blog));
  };

  const clickDeleteHandler = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmation) {
      dispatch(deleteBlog(blog));
      history.push('/');
    }
  };

  if (!blog) {
    return null;
  }

  const clickCommentHandler = async (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment.input.value));
    comment.setValue('');
  };

  return (
    <div>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">
              {blog.title} by {blog.author}
            </Typography>
          </Box>
          <Typography>
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>
          <Typography>
            likes <span id="likes">{blog.likes}</span>
            <IconButton size="small" onClick={clickLikeHandler}>
              <FavoriteIcon />
            </IconButton>
          </Typography>
          <Typography variant="body2">added by {blog.user[0].name}</Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteForeverIcon />}
            onClick={clickDeleteHandler}
            size="small"
          >
            delete
          </Button>
          <Box mt={3}>
            <Typography variant="h5">comments</Typography>
            <form onSubmit={clickCommentHandler}>
              <TextField
                size="small"
                margin="none"
                variant="filled"
                {...comment.input}
              ></TextField>
              <Button
                className={classes.commentButton}
                variant="outlined"
                size="large"
                onClick={clickCommentHandler}
              >
                add
              </Button>
            </form>
            <List dense="true">
              {blog.comments.map((comment) => (
                <ListItem key={comment}>
                  <ListItemIcon>
                    <CommentIcon />
                  </ListItemIcon>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Blog;
