import React from 'react';
import { connect } from 'react-redux';
import { createNewAs } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const createNew = async (event) => {
    event.preventDefault();
    props.createNewAs(event.target.anecdote.value);
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default connect(null, { createNewAs })(AnecdoteForm);
