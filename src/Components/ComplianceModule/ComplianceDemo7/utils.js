export const isEmail = (email) => {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})\s*$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

export const checkPasswordContain = (password) => {
  const pattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{7,50}$";
  if (password.match(pattern)) {
    return true;
  }

  return false;
};

export const checkPasswordForReset = (password) => {
  const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
  if (password.match(pattern)) {
    return true;
  }

  return false;
};

export const checkPersonalDetailsForm = (values) => {
  if (
    !values.fullName ||
    values.fullName === "" ||
    !values.mobileNumber ||
    values.mobileNumber === "" ||
    values.mobileNumber.length < 10 ||
    !values.companyName ||
    values.companyName === "" ||
    !values.designation ||
    values.designation === "" ||
    !values.password ||
    values.password === "" ||
    values.password.length < 8 ||
    !checkPasswordContain(values.password) ||
    !values.confirmPassword ||
    values.confirmPassword.length < 8 ||
    values.confirmPassword === "" ||
    values.confirmPassword !== values.password ||
    !values.confirmPassword ||
    values.confirmPassword === ""
  ) {
    return true;
  }

  return false;
};
