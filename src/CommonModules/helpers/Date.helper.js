import moment from "moment";

export const addDaysInDate = (date, numberOfDays) => {
  return moment(date).add(numberOfDays, "days").format();
};

export const subtractDaysInDate = (date, numberOfDays) => {
  return moment(date).subtract(numberOfDays, "days").format();
};

export const getCurrentDate = () => {
  return new Date();
};

export const addMonthToCurrentDate = (date) => {
  return new Date(date.setMonth(date.getMonth() + 1));
};

export const subtractMonthToCurrentDate = (date) => {
  return new Date(date.setMonth(date.getMonth() - 1));
};

export const getFirstMondayOfMonth = (firstMonday) => {
  return parseInt(moment(firstMonday).format("D"));
};

export const getMondays = (date) => {
  let givenDate = new Date(date),
    month = givenDate.getMonth(),
    mondays = [];
  givenDate.setDate(1);
  // Get the first Monday in the month
  while (givenDate.getDay() !== 1) {
    givenDate.setDate(givenDate.getDate() + 1);
  }
  // Get all the other Mondays in the month
  while (givenDate.getMonth() === month) {
    mondays.push(new Date(givenDate.getTime()));
    givenDate.setDate(givenDate.getDate() + 7);
  }
  return mondays;
};
