import { GET_USER_REQUEST, EDIT_USER_STATUS_REQUEST } from "./../types/user";

export function getUsers(data) {
  return { type: GET_USER_REQUEST, payload: data };
}

export function editUserStatus(data) {
  return { type: EDIT_USER_STATUS_REQUEST, payload: data };
}
