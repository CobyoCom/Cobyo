import { editMeApi, fetchMeApi } from "./meApi";

export const types = {
  fetchMeSuccess: "FETCH_ME_SUCCESS",
  editMeSuccess: "EDIT_ME_SUCCESS"
};

function fetchMeSuccess(payload) {
  return {
    type: types.fetchMeSuccess,
    payload
  };
}

function editMeSuccess(payload) {
  return {
    type: types.editMeSuccess,
    payload
  };
}

export function fetchMe() {
  return async dispatch => {
    const response = await fetchMeApi();
    const me = response.data.me;
    dispatch(fetchMeSuccess(me));

    return Promise.resolve(me);
  };
}

export function editMe(name) {
  return async dispatch => {
    const response = await editMeApi(name);
    const me = response.data.editMe;
    dispatch(editMeSuccess(me));

    return Promise.resolve(me);
  };
}