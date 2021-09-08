import api from "../../../apiServices";

const insertUpdateAPIRequest = (payload) =>
  api.get("ins_upd_del_User", {
    params: {
      uInput: payload,
    },
  });
const sendOTP = (payload) =>
  api.get("sendmsgwithverificationcode", {
    params: {
      uInput: payload,
    },
  });
const availabilityCheck = (payload) =>
  api.get("availabilityCheck", {
    params: {
      uInput: payload,
    },
  });

export default {
  insertUpdateAPIRequest,
  sendOTP,
  availabilityCheck,
};
