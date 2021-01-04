export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      user,
    });
  };
};
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

const reducer = (state = null, action) => {
  //console.log('state now: ', state);
  //console.log('action', action);
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
