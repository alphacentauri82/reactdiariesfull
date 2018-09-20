import actionTypes from './action_types';
import api from '../../api/tutor';

function setFeedEventPayload(events) {
  return {
    type: actionTypes.GET_FEED_EVENTS,
    payload: events,
  };
}

function setPupilsPayload(pupils) {
  return {
    type: actionTypes.GET_PUPILS,
    payload: pupils,
  };
}

function setPupilSelectedPayload(pupil) {
  return {
    type: actionTypes.GET_PUPIL_SELECTED,
    payload: pupil,
  };
}

function setSelectPupilPayload(pupil) {
  return {
    type: actionTypes.SET_PUPIL,
    payload: pupil,
  };
}

function getFeedEvents() {
  return (dispatch) => {
    const events = api.feed.getEvents();
    dispatch(setFeedEventPayload(events));
    return events;
  };
}

function getPupilList() {
  return (dispatch) => {
    const pupils = api.pupil.getList();
    dispatch(setPupilsPayload(pupils));
    return pupils;
  };
}

function getPupilSelected() {
  return (dispatch) => {
    const pupils = api.pupil.selected();
    dispatch(setPupilSelectedPayload(pupils));
    return pupils;
  };
}

function selectPupil(pupilId) {
  return (dispatch) => {
    const pupil = api.pupil.set(pupilId);
    dispatch(setSelectPupilPayload(pupil));
    return pupil;
  };
}

export default {
  getFeedEvents,
  getPupilList,
  getPupilSelected,
  selectPupil,
};
