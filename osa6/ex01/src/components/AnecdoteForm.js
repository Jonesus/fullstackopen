import React from 'react';
import { connect } from 'react-redux';
import { createAction } from '../reducers/anecdoteReducer';
import { notifyAction } from '../reducers/notificationReducer';

const mapDispatchToProps = {
  createAction,
  notifyAction
};

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    this.props.createAction(content);
    this.props.notifyAction(`new anecdote: '${content}'`, 5000);
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
