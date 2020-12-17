const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

const initialBlogs = [
  {
    title: 'The first ever blog',
    author: 'Firstorian Authorian',
    url: 'www.firsty.com',
    likes: 1,
    user: [mongoose.Types.ObjectId('5fda4b427956312a40ef2b47')],
  },
  {
    title: 'A second blog',
    author: 'Mr. Secondary',
    url: 'www.seco.nd',
    likes: 2,
    user: '5fda4b427956312a40ef2b47',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  console.log('here');
  console.log(blogs[0]);
  console.log(blogs[0].toJSON());
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
