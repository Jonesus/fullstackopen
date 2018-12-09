import React from 'react';
import { connect } from 'react-redux';
import { backendCreateAction } from '../reducers/anecdoteReducer';
import { setAction, resetAction } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const mapDispatchToProps = {
  backendCreateAction,
  setAction,
  resetAction
};

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      content: e.target.anecdote.value,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    };
    e.target.anecdote.value = '';
    const resp = await anecdoteService.postAnecdote(data);
    this.props.backendCreateAction(resp); // eslint-disable-line
    this.props.setAction(`new anecdote: '${resp.content}'`); // eslint-disable-line
    setTimeout(() => this.props.resetAction(), 5000); // eslint-disable-line
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
