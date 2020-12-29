let timeoutID;
export const setNotification = (text, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'NEW_NOTIFICATION',
      content: text,
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

const reducer = (state = null, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.content;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default reducer;
