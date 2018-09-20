import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from './auth/reducers';
import intl from './i18n/reducer';
import tutor from './tutor/reducers';
import ui from './ui/reducers';

const reducer = combineReducers({
  auth,
  intl,
  tutor,
  ui,
});

export default (initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(
      reducer,
      initialState,
      applyMiddleware(
        thunk,
        createLogger,
      ),
    );
  }
  if (!window.store) {
    window.store = createStore(
      reducer,
      initialState,
      applyMiddleware(
        thunk,
        createLogger,
      ),
    );
  }

  return window.store;
};
