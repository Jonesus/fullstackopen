import React from 'react';
import { voteAction } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState();
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has
              {anecdote.votes}
              <button type="button" onClick={() => store.dispatch(voteAction(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
