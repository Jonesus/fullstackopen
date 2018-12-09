const initialState = {
  notification: 'ebin nice'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notificaiton: action.content };
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setAction = content => ({
  type: 'SET_NOTIFICATION',
  content
});

export const resetAction = () => ({ type: 'RESET_NOTIFICATION' });

export default reducer;
