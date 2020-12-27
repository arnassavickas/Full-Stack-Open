export const changeFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    filter,
  };
};

const filter = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default filter;
