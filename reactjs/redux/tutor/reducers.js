import actionTypes from './action_types';

const initialState = {
  events: [],
  pupils: [],
  pupilSelected: {},
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_FEED_EVENTS:
      return Object.assign({}, state, {
        events: action.payload,
      });
    case actionTypes.GET_PUPILS:
      return Object.assign({}, state, {
        pupils: action.payload,
      });
    case actionTypes.GET_PUPIL_SELECTED:
      return Object.assign({}, state, {
        pupilSelected: action.payload,
      });
    case actionTypes.SET_PUPIL:
      return Object.assign({}, state, {
        pupilSelected: action.payload,
      });
    default:
      return state;
  }
}

export default reducer;
