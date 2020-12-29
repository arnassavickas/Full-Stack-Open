import anecdoteService from '../services/anecdotes';

export const voteFor = (id) => {
  return async (dispatch) => {
    const response = await anecdoteService.like(id);
    dispatch({
      type: 'LIKE',
      data: response,
    });
  };
};

export const createNewAs = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.createNew(content);
    dispatch({ type: 'CREATE_NEW', data: response });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'LIKE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
    case 'CREATE_NEW':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
