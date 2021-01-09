import React, { useState, useEffect } from 'react';

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState([]);

  //const books = [...props.books];

  useEffect(() => {
    setBooks([...props.books]);
  }, [props.books]);

  useEffect(() => {
    if (books) {
      let tempGenres = [];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (tempGenres.indexOf(genre) === -1) {
            tempGenres = tempGenres.concat(genre);
          }
        });
      });
      setGenres([...tempGenres]);
    }
  }, [books]);

  useEffect(() => {
    if (props.books) {
      let tempBooks = [...props.books];
      filters.forEach((genre) => {
        tempBooks = tempBooks.filter((book) => {
          if (book.genres.indexOf(genre) !== -1) {
            return book;
          }
        });
      });
      setBooks([...tempBooks]);
    }
  }, [filters]);

  const changeFilters = (event) => {
    if (filters.indexOf(event.target.value) === -1) {
      setFilters([...filters, event.target.value]);
    } else {
      let filtersCopy = [...filters];
      filtersCopy.splice(
        filters.indexOf(event.target.value),
        filters.indexOf(event.target.value) + 1
      );
      setFilters(filtersCopy);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {genres.map((genre) => (
        <div key={genre}>
          <label>
            <input onChange={changeFilters} type='checkbox' value={genre} />
            {genre}
          </label>
        </div>
      ))}
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

export default Books;
