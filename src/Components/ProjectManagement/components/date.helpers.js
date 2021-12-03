import moment from "moment";

const isBeforeToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  return moment(todayDate).isAfter(date);
};

const isBefore = (compareDate, date) => {
  const _compareDate = moment(compareDate).format("YYYY-MM-DD");
  return moment(_compareDate).isAfter(date);
};
export { isBeforeToday, isBefore };
