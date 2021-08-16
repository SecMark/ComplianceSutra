import moment from "moment";
const differenceInDate = (a, b) => {
  if (a.length !== 0 && b.length !== 0) {
    const from = new Date(`${a[1]}/${a[0]}/${a[2]}`);
    const to = new Date(`${b[1]}/${b[0]}/${b[2]}`);
    const differenceInTime = Math.abs(to - from);
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  }
  return 0;
};

const isSameOrAfterToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  if (date.length !== 0) {
    const dateInRequiredFormat = moment(date?.join("-"), "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    return moment(todayDate).isSameOrAfter(dateInRequiredFormat);
  }
};

export { differenceInDate, isSameOrAfterToday };
