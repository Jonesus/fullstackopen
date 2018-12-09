import { createStore, combineReducers } from 'redux';
import anecdoteReducer, { backendCreateAction } from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import anecdoteService from './services/anecdoteService';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filters: filterReducer
});

const store = createStore(reducer);

anecdoteService
  .fetchAnecdotes()
  .then(anecdotes => anecdotes.forEach(anecdote => store.dispatch(backendCreateAction(anecdote))));

export default store;
