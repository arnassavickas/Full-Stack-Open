import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('add');
  const [token, setToken] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [updateBooks, setUpdateBooks] = useState(false);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWidth(addedBook);
      window.alert(`a book ${addedBook.title} was added`);
    },
  });

  const updateCacheWidth = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('library-part8')) {
      console.log(localStorage.getItem('library-part8'));
      setToken(localStorage.getItem('library-part8'));
    }
  }, []);

  const logout = () => {
    setToken(null);
    if (page === 'add' || page === 'recommended') {
      setPage('books');
    }
    localStorage.clear();
    client.resetStore();
  };

  const booksNeedUpdating = (yesNo) => {
    setUpdateBooks(yesNo);
  };

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('recommended')}>recommended</button>
        )}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        token={token}
        authors={authors.data.allAuthors}
        show={page === 'authors'}
      />

      <Books books={books.data.allBooks} show={page === 'books'} />

      {token && (
        <Recommended
          updateBooks={updateBooks}
          booksNeedUpdating={booksNeedUpdating}
          books={books.data.allBooks}
          token={token}
          show={page === 'recommended'}
        />
      )}
      {token && (
        <NewBook booksNeedUpdating={booksNeedUpdating} show={page === 'add'} />
      )}
      {!token && (
        <Login
          setPage={() => setPage('authors')}
          setToken={(token) => setToken(token)}
          show={page === 'login'}
        />
      )}
    </div>
  );
};

export default hot(App);
