import moment from "moment";

const isBeforeToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  return moment(todayDate).isAfter(date);
};
const isAfterToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  return moment(todayDate).isBefore(date);
};

const isBefore = (compareDate, date) => {
  const _compareDate = moment(compareDate).format("YYYY-MM-DD");
  return moment(_compareDate).isAfter(date);
};
const isAfter = (compareDate, date) => {
  const _compareDate = moment(compareDate).format("YYYY-MM-DD");
  return moment(_compareDate).isBefore(date);
};
const getProjectDateFormat = (date, format = "D MMM YYYY") => {
  return date && format ? moment(date).format(format) : "";
};
export { isBeforeToday, isBefore, getProjectDateFormat, isAfter, isAfterToday };
