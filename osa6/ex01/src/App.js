import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = props => (
  <div>
    <h1>Programming anecdotes</h1>
    <Notification />
    <AnecdoteList {...props} />
    <AnecdoteForm {...props} />
  </div>
);

export default App;
