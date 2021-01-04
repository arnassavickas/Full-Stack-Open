import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author by default', () => {
  const blog = {
    title: 'Pavadinimas',
    author: 'Autorius',
    url: 'www.url.lt',
    likes: 987,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container.querySelector('.collapsedTitle')).toBeVisible();
  expect(component.container.querySelector('.collapsedAuthor')).toBeVisible();
  expect(component.getByText('www.url.lt')).not.toBeVisible();
  expect(component.getByText(/987/)).not.toBeVisible();
});

test('renders likes and url after a button click', () => {
  const blog = {
    title: 'Pavadinimas',
    author: 'Autorius',
    url: 'www.url.lt',
    likes: 987,
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.getByText('www.url.lt')).toBeVisible();
  expect(component.getByText(/987/)).toBeVisible();
});

test('twice clicking like button calls event handler twice', () => {
  //works if clickLikeHandler functions are switch places
  const blog = {
    title: 'Pavadinimas',
    author: 'Autorius',
    url: 'www.url.lt',
    likes: 987,
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} resortBlogs={mockHandler} />);

  component.debug();

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
