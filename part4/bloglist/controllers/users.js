const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const { response } = require('../app');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.username || !body.password) {
    return response
      .status(401)
      .json({ error: 'username or password not provided' });
  } else if (body.username.length < 3) {
    return response
      .status(401)
      .json({ error: 'username must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(users);
});

module.exports = usersRouter;
