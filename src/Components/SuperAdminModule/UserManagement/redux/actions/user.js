import { GET_USER_REQUEST } from "./../types/user";

export function getUsers(data) {
  return { type: GET_USER_REQUEST, payload: data };
}
