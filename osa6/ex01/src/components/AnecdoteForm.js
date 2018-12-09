import React from 'react';
import { createAction } from '../reducers/anecdoteReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const store = { ...this.props };
    store.dispatch(createAction(content));

    e.target.anecdote.value = '';
  };

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="button">create</button>
        </form>
      </div>
    );
  }
}

export default AnecdoteForm;
