import actionTypes from './action_types';
import api from '../../api/auth';

function getUserLoged(user) {
  return {
    type: actionTypes.GET_USER_AUTH,
    payload: user,
  };
}

function setUserLoged(user) {
  return {
    type: actionTypes.SET_USER_AUTH,
    payload: user,
  };
}

function setAuthError(error) {
  return {
    type: actionTypes.SET_ERROR_AUTH,
    payload: error,
  };
}

function login(userCredentials) {
  const { username, password } = userCredentials;
  return async (dispatch) => {
    try {
      // const user = await api.auth.signIn(username, password);
      console.log('userCredentials', userCredentials);
      console.log('username', username);
      console.log('is username', username == 'Taborda');
      let user;
      if (username == 'Taborda') {
        console.log('taborda');
        user = {
          name: 'Damian Taborda',
          role: 'student',
          token: 'asd2324ekwwdasdasd',
          username: 'dtaborda',
        };
      } else {
        console.log('gisela');
        user = {
          name: 'Gisela Provenzano',
          role: 'professor',
          token: 'asd2324ekwwdasdasd',
          username: 'gprovenza',
        };
      }

      console.log('user', user);

      dispatch(setUserLoged(user));
      return user;
    } catch (e) {
      const error = { error: e };
      dispatch(setAuthError(error));
      return error;
    }
  };
}

function register(createUser) {
  return async (dispatch) => {
    try {
      const user = await api.auth.signUp(createUser);
      dispatch(setUserLoged(user));
      return user;
    } catch (e) {
      const error = { error: e };
      dispatch(setAuthError(error));
      return error;
    }
  };
}

function getUser(id) {
  return async (dispatch) => {
    try {
      // const user = await api.users.getSingle(id);
      const user = {
        name: 'Damian Taborda',
        role: 'student',
        token: 'asd2324ekwwdasdasd',
        username: 'dtaborda',
      };
      dispatch(setUserLoged(user));
      return user;
    } catch (e) {
      const error = { error: e };
      dispatch(setAuthError(error));
      return error;
    }
  }
}

export default {
  login,
  register,
};
