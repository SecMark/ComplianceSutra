import api from "../../../../../apiServices";

export const getUsersAPI = (payload) => {
  return api.post("api/CoSettings", payload);
};

export const editUserStatusAPI = (payload) => {
  return api.post("api/CoSettings", payload);
};
