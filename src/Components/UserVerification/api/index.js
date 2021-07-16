import api from "../../../apiServices";

const insertUpdateUserRequets = (payload) =>
    api.post("/api/ins_upd_del_User", payload);

export default {
    insertUpdateUserRequets,
};
