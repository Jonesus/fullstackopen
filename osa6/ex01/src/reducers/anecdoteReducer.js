import anecdoteService from '../services/anecdoteService';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'VOTE':
      return state.map(a => (a.id === action.anecdote.id ? action.anecdote : a));
    case 'CREATE':
      return [...state, action.anecdote];
    default:
      return state;
  }
};

export const initAnecdotes = () => async dispatch => {
  const data = await anecdoteService.fetchAnecdotes();
  dispatch({
    type: 'INIT',
    data
  });
};

export const voteAction = anecdote => async dispatch => {
  await anecdoteService.voteAnecdote(anecdote);
  dispatch({
    type: 'VOTE',
    anecdote
  });
};

export const createAction = content => async dispatch => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  };
  const resp = await anecdoteService.postAnecdote(newAnecdote);
  dispatch({
    type: 'CREATE',
    anecdote: resp
  });
};

export default reducer;
