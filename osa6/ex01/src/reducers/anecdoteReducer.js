const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
});

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.id);
    const voted = state.find(a => a.id === action.id);

    return [...old, { ...voted, votes: voted.votes + 1 }];
  }
  if (action.type === 'CREATE') {
    return [...state, { content: action.content, id: getId(), votes: 0 }];
  }
  if (action.type === 'BACKEND_CREATE') {
    return [...state, action.anecdote];
  }

  return state;
};

export const voteAction = id => ({
  type: 'VOTE',
  id
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
