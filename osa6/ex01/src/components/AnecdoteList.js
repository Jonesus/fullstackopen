import React from 'react';
import Filter from './Filter';
import { voteAction } from '../reducers/anecdoteReducer';
import { setAction, resetAction } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const { anecdotes, filters } = store.getState();

  const vote = anecdote => e => {
    store.dispatch(voteAction(anecdote.id));
    store.dispatch(setAction(`you voted: '${anecdote.content}'`));
    setTimeout(() => store.dispatch(resetAction()), 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(a => a.content.includes(filters.filter))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has
              {anecdote.votes}
              <button type="button" onClick={vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
