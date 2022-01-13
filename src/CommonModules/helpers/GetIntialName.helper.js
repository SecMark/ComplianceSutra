export const getIntialName = (name) => {
  if (name != undefined) {
    let initials = "";
    initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  }
};

export const getShortStr = (str, length = 8) => {
  return str?.length > length ? str?.substr(0, length) + "..." : str;
};
