import actionTypes from './action_types';

const initialState = {
  menu: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_MENU_UI:
      return Object.assign({}, state, {
        menu: action.payload,
      });
    default:
      return state;
  }
}

export default reducer;
