import api from "../../../apiServices";

const insertUpdateUserRequets = (payload) =>
  api.post("compliance.api.signUp", payload);

export default {
  insertUpdateUserRequets,
};
