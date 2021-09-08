import api from "../../../apiServices";

const insertUpdateUserRequets = (payload) =>
  api.get("ins_upd_del_User", {
    params: {
      uInput: payload,
    },
  });

export default {
  insertUpdateUserRequets,
};
