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
      return [...state, action.anecdote];
    case 'CREATE':
      return [...state, { content: action.content, id: getId(), votes: 0 }];
    case 'BACKEND_CREATE':
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

export const voteAction = anecdote => ({
  type: 'VOTE',
  anecdote
});

export const createAction = content => ({
  type: 'CREATE',
  content
});

export const backendCreateAction = anecdote => ({
  type: 'BACKEND_CREATE',
  anecdote
});

export default reducer;
