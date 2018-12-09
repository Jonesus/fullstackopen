const initialState = {
  notification: 'ebin nice'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notification: action.content };
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const notifyAction = (content, timeout) => async dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    content
  });
  setTimeout(() => dispatch(resetNotification()), timeout);
};

export const resetNotification = () => ({ type: 'RESET_NOTIFICATION' });

export default reducer;
