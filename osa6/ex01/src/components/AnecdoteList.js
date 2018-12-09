import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAction } from '../reducers/anecdoteReducer';
import { setAction, resetAction } from '../reducers/notificationReducer';

const mapStateToProps = state => ({
  anecdotes: state.anecdotes.filter(a => a.content.includes(state.filters.filter))
});

const mapDispatchToProps = {
  voteAction,
  setAction,
  resetAction
};

// eslint-disable-next-line
const AnecdoteList = ({ anecdotes, voteAction, setAction, resetAction }) => {
  const vote = anecdote => e => {
    voteAction(anecdote.id);
    setAction(`you voted: '${anecdote.content}'`);
    setTimeout(() => resetAction(), 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
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

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
