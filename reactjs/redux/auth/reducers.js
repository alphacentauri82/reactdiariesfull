import actionTypes from './action_types';

const initialState = {
  user: null,
  error: null,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SET_USER_AUTH:
      return Object.assign({}, state, {
        user: action.payload,
      });

    case actionTypes.SET_ERROR_AUTH:
      return Object.assign({}, state, {
        error: action.payload.error,
      });
    default:
      return state;
  }
}

export default reducer;
