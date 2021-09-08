import api from "../../../apiServices";

const loginAccount = (payload) =>
  api.get("Loginsuccess", {
    params: { uInput: payload },
  });
const updatePassword = (payload) =>
  api.get("UpdatePassword", {
    params: { uInput: payload },
  });
export default {
  loginAccount,
  updatePassword,
};
