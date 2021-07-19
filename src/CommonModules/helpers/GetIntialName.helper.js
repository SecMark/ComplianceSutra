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
