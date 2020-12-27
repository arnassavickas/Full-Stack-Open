export const newNotification = (content) => {
  return { type: 'NEW_NOTIFICATION', content };
};

export const showNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    content,
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
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
