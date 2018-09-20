import actionTypes from './action_types';
import api from '../../api/ui';

function setMenuPayload(menu) {
  return {
    type: actionTypes.GET_MENU_UI,
    payload: menu,
  };
}

function getAdminMenuItems() {
  return (dispatch) => {
    const menu = api.menu.getAdminItems();
    dispatch(setMenuPayload(menu));
    return menu;
  };
}

function getProfessorMenuItems() {
  return (dispatch) => {
    const menu = api.menu.getProfessorItems();
    dispatch(setMenuPayload(menu));
    return menu;
  };
}

function getTutorMenuItems() {
  return (dispatch) => {
    const menu = api.menu.getTutorItems();
    dispatch(setMenuPayload(menu));
    return menu;
  };
}

export default {
  getAdminMenuItems,
  getProfessorMenuItems,
  getTutorMenuItems,
};
