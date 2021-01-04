let timeoutID;
export const setNotification = (text, severity, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'NEW_NOTIFICATION',
      content: text,
      severity,
      show: true,
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

const reducer = (state = { text: null, color: null }, action) => {
  //console.log('state now: ', state);
  //console.log('action', action);
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return { text: action.content, severity: action.severity, show: true };
    case 'REMOVE_NOTIFICATION':
      return { ...state, show: false };
    default:
      return state;
  }
};

export default reducer;
