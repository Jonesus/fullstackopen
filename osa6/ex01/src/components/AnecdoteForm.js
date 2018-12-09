import React from 'react';
import { createAction } from '../reducers/anecdoteReducer';
import { setAction, resetAction } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const { store } = this.props;
    store.dispatch(createAction(content));
    store.dispatch(setAction(`new anecdote: '${content}'`));
    setTimeout(() => store.dispatch(resetAction()), 5000);

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
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default AnecdoteForm;
