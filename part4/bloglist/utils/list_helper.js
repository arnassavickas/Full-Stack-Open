const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const reducer = (favourite, blog) => {
    if (favourite.likes < blog.likes) {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    } else {
      return favourite;
    }
  };
  return blogs.reduce(reducer, { likes: 0 });
};

const mostBlogs = (blogs) => {
  const array = _(blogs)
    .map((el) => el.author)
    .countBy()
    .entries()
    .maxBy(_.last());
  return { author: array[0], blogs: array[1] };
};

const mostLikes = (blogs) => {
  const object = {};
  const reducer = (sum, value) => {
    if (object[value.author]) {
      object[value.author] += value.likes;
    } else {
      object[value.author] = value.likes;
    }
  };
  blogs.reduce(reducer, 0);
  array = Object.keys(object).map((key) => ({
    author: key,
    likes: object[key],
  }));
  return _.maxBy(array, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
