import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';
import { initializeUsers } from './userReducer';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (newBlog) => {
  return (dispatch) => {
    dispatch({ type: 'NEW_BLOG', data: newBlog });
    dispatch(initializeUsers());
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog(blog);
    dispatch({ type: 'LIKE_BLOG', data: likedBlog });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog);
      dispatch({
        type: 'DELETE_BLOG',
        data: blog,
      });
      dispatch(
        setNotification(
          `blog ${blog.title} was deleted from the server`,
          'warning',
          4
        )
      );
    } catch (error) {
      if (/401/.test(error)) {
        dispatch(
          setNotification('you are not the creator of this blog', 'error', 4)
        );
      } else if (/500/.test(error)) {
        dispatch(
          setNotification('blog is already deleted from the server', 'error', 4)
        );
        dispatch({
          type: 'DELETE_BLOG',
          data: blog,
        });
      }
    }
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.commentBlog(blog, comment);
      dispatch({
        type: 'COMMENT_BLOG',
        data: commentedBlog,
        comment,
      });
      dispatch(setNotification('comment saved', 'success', 4));
    } catch (error) {
      dispatch(setNotification('comment failed', 'error', 4));
    }
  };
};

const reducer = (state = [], action) => {
  //console.log('state now: ', state);
  //console.log('action', action);
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes);
    case 'NEW_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes);
    case 'LIKE_BLOG':
      return state
        .map((blog) => (blog.id === action.data.id ? action.data : blog))
        .sort((a, b) => b.likes - a.likes);
    case 'DELETE_BLOG':
      return state
        .filter((blog) => {
          return blog.id !== action.data.id;
        })
        .sort((a, b) => b.likes - a.likes);
    case 'COMMENT_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    default:
      return state;
  }
};

export default reducer;
