import React from 'react';
import { connect } from 'react-redux';
import { createAction } from '../reducers/anecdoteReducer';
import { setAction, resetAction } from '../reducers/notificationReducer';

const mapDispatchToProps = {
  createAction,
  setAction,
  resetAction
};

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.createAction(content); // eslint-disable-line
    this.props.setAction(`new anecdote: '${content}'`); // eslint-disable-line
    setTimeout(() => this.props.resetAction(), 5000); // eslint-disable-line

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

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
