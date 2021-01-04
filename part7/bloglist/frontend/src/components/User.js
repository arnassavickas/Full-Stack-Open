import React from 'react';
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <Paper>
      <Box p={2}>
        <Box mb={3}>
          <Typography variant="h4">{user.name}</Typography>
        </Box>
        <Typography variant="h5">added blogs:</Typography>
        <List dense="true">
          {user.blogs.map((blog) => (
            <ListItem key={blog.title}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default User;
