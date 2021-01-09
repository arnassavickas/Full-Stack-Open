import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);
  const user = useQuery(ME);
  const [getRecommendedBooks, { data, refetch }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (user.data) {
      getRecommendedBooks({
        variables: { genre: [user.data.me.favoriteGenre] },
      });
    }
  }, [user]);

  useEffect(() => {
    if (props.updateBooks) {
      refetch();
      props.booksNeedUpdating(false);
    }
  }, [props.show]);

  useEffect(() => {
    if (data) {
      setBooks([...data.allBooks]);
    }
  }, [data]);

  if (!props.show || user.loading) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
