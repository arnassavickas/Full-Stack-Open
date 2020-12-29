import React from 'react';
import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.anecdotes.find((anecdote) => anecdote.id === id);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
    console.log('vote', id);
    props.voteFor(id);
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const anecdotes = () => {
    const filteredAnecdotes = state.anecdotes.filter((anecdote) => {
      const regExp = new RegExp(state.filter, 'i');
      return regExp.test(anecdote.content);
    });
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  };
  return {
    anecdotes: anecdotes(),
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
