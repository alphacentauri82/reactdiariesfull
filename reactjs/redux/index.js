import {
  actions as authActions,
  actionTypes as authActionTypes,
  reducers as authReducers,
} from './auth';

import {
  actions as tutorActions,
  actionTypes as tutorActionTypes,
  reducers as tutorReducers,
} from './tutor';

import {
  actions as uiActions,
  actionTypes as uiActionTypes,
  reducers as uiReducers,
} from './ui';

const actions = {
  ...authActions,
  ...tutorActions,
  ...uiActions,
};

const actionTypes = {
  ...authActionTypes,
  ...tutorActionTypes,
  ...uiActionTypes,
};

const reducers = {
  auth: authReducers,
  tutor: tutorReducers,
  ui: uiReducers,
};

export {
  actionTypes,
  actions,
  reducers,
};
