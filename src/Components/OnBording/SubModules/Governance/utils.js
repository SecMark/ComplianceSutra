export const isEmail = (email) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})\s*$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};