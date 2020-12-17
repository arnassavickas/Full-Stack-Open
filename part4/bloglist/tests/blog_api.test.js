const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv');

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArrayBlog = blogObjects.map((blog) => {
    return blog.save();
  });
  await Promise.all(promiseArrayBlog);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain('The first ever blog');
});

test('a  valid blog can be added', async () => {
  const newBlog = {
    title: 'NEW BLOG',
    author: 'Very Newary',
    url: 'www.new.lt',
    likes: 0,
    user: [mongoose.Types.ObjectId('5fda4b427956312a40ef2b47')],
  };

  await api
    .post('/api/blogs/')
    .set(
      'Authorization',
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdmFzIiwiaWQiOiI1ZmRhNGI0Mjc5NTYzMTJhNDBlZjJiNDciLCJpYXQiOjE2MDgyMjU0MDZ9.TpoKbCIkuhCui_bwE5r-E6huS9J_pfYuq6kDFTpKPxU'
    )
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await helper.blogsInDb();
  expect(response).toHaveLength(helper.initialBlogs.length + 1);

  const titles = response.map((blog) => blog.title);
  expect(titles).toContain('NEW BLOG');
});

test('blog without content is not added', async () => {
  const newBlog = {
    likes: 0,
    user: [mongoose.Types.ObjectId('5fda4b427956312a40ef2b47')],
  };
  await api
    .post('/api/blogs/')
    .set(
      'Authorization',
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdmFzIiwiaWQiOiI1ZmRhNGI0Mjc5NTYzMTJhNDBlZjJiNDciLCJpYXQiOjE2MDgyMjU0MDZ9.TpoKbCIkuhCui_bwE5r-E6huS9J_pfYuq6kDFTpKPxU'
    )
    .send(newBlog)
    .expect(400);

  const response = await helper.blogsInDb();
  expect(response).toHaveLength(helper.initialBlogs.length);
});

test.only('a specific blog is returned', async () => {
  const blogList = await helper.blogsInDb();
  const response = await api
    .get(`/api/blogs/${blogList[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log(response.body[0]);
  console.log(blogList[0]);

  expect(response.body[0]).toEqual(blogList[0]);
});

test('a specific blog can be deleted', async () => {
  const blogList = await helper.blogsInDb();
  await api
    .delete(`/api/blogs/${blogList[0].id}`)
    .set(
      'Authorization',
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdmFzIiwiaWQiOiI1ZmRhNGI0Mjc5NTYzMTJhNDBlZjJiNDciLCJpYXQiOjE2MDgyMjU0MDZ9.TpoKbCIkuhCui_bwE5r-E6huS9J_pfYuq6kDFTpKPxU'
    )
    .expect(204);

  const blogsInDb = await helper.blogsInDb();
  expect(blogsInDb).toHaveLength(blogList.length - 1);

  const titles = blogsInDb.map((blog) => blog.title);
  expect(titles).not.toContain(blogList[0].title);
});

test('unique identifier of each blog is id', async () => {
  const blogList = await helper.blogsInDb();
  blogList.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('if blog is missing likes property, it defaults to 0', async () => {
  const user = await User.find({});

  const blogWithoutLikes = {
    title: 'Likeless',
    author: 'Lucky Likely',
    url: 'www.like.lt',
    userId: user[0]._id.toString(),
  };

  await api
    .post('/api/blogs')
    .set(
      'Authorization',
      `bearer ${jwt.sign(
        { username: 'admin', id: user[0]._id.toString() },
        process.env.SECRET
      )}`
    )
    .send(blogWithoutLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const savedBlog = await Blog.findOne({ title: blogWithoutLikes.title });
  expect(savedBlog.likes).toEqual(0);
});

test('blog is not created if token is missing', async () => {
  const blogWithoutToken = {
    title: 'Tokenless',
    author: 'Tolkenis',
    url: 'www.lnk.lt',
    likes: 1,
  };

  const initialBlogs = await helper.blogsInDb();

  const result = await api
    .post('/api/blogs')
    .set(
      'Authorization',
      'bearer GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhdmFzIiwiaWQiOiI1ZmRhNGI0Mjc5NTYzMTJhNDBlZjJiNDciLCJpYXQiOjE2MDgyMjU0MDZ9.TpoKbCIkuhCui_bwE5r-E6huS9J_pfYuq6kDFTpKPxU'
    )
    .send(blogWithoutToken)
    .expect(401);

  expect(result.body.error).toContain('invalid token');

  const blogsInDb = await helper.blogsInDb();
  expect(blogsInDb).toHaveLength(initialBlogs.length);
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('slapta', 10);
    const user = new User({ username: 'admin', name: 'Adminas', passwordHash });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'savas',
      name: 'Arnas',
      password: 'sarnas',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test(`creation fails with proper statuscode
  and message if username already exists`, async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'admin',
      name: 'adminas',
      password: 'admin',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test(`creation fails with proper statuscode
  and message if username is too short`, async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'aa',
      name: 'adminas',
      password: 'admin',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('at least 3 characters');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test(`creation fails with proper statuscode
  and message if username is not provided`, async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: '',
      name: 'adminas',
      password: 'admin',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username or password not provided');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test(`creation fails with proper statuscode
  and message if password is not provided`, async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'usernamas',
      name: 'adminas',
      password: '',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username or password not provided');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
