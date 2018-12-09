import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAction } from '../reducers/anecdoteReducer';
import { notifyAction } from '../reducers/notificationReducer';

const mapStateToProps = state => ({
  anecdotes: state.anecdotes.filter(a => a.content && a.content.includes(state.filters.filter))
});

const mapDispatchToProps = {
  voteAction,
  notifyAction
};

// eslint-disable-next-line
const AnecdoteList = ({ anecdotes, voteAction, notifyAction }) => {
  const vote = anecdote => async e => {
    await voteAction({ ...anecdote, votes: anecdote.votes + 1 });
    notifyAction(`you voted: '${anecdote.content}'`, 5000);
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
