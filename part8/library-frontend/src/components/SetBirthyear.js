import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_BIRTH, ALL_AUTHORS } from '../queries';

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState('');

  const [changeBirth] = useMutation(CHANGE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log('set birthyear...');

    changeBirth({
      variables: { name, setBornTo: Number(born) },
    });
    setBorn('');
  };

  const onSelectedChange = async (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={onSelectedChange}>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
