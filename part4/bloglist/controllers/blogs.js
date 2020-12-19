const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv');

blogsRouter.get('/', async (request, response) => {
  const blogsResponse = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogsResponse.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
  const blogsResponse = await Blog.findById(request.params.id);
  if (blogsResponse) {
    response.json(blogsResponse.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog(body);

  blog.user = user._id;

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user.toString() === decodedToken.id) {
    await Blog.deleteOne({ _id: request.params.id });
    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: 'user is not the creator of this blog' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog.likes = request.body.likes;
  blog.save();
  response.status(200).end();
});

module.exports = blogsRouter;
