import moment from "moment";
const getInitials = (name) => {
  const nameArray = name ? name.split(" ") : " ";
  if (nameArray.length > 1) {
    return `${nameArray[0].slice(0, 1)}${nameArray[nameArray.length - 1]
      .slice(0, 1)
      .toUpperCase()}`;
  } else {
    return `${nameArray[0].slice(0, 2).toUpperCase()}`;
  }
};
const checkResponse = (response) => {
  try {
    if (response.data.message === null) {
      return true;
    }
    if (response.data.message[0].StatuCode === "norec") {
      return false;
    }
  } catch (err) {
    return false;
  }
};
const isSameOrBeforeToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  if (date.length !== 0) {
    const dateInRequiredFormat = moment(date.join("-"), "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    return moment(dateInRequiredFormat).isSameOrBefore(todayDate);
  }
};
const isBeforeToday = (date) => {
  const todayDate = moment().format("YYYY-MM-DD");
  if (date.length !== 0) {
    const dateInRequiredFormat = moment(date.join("-"), "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    return moment(dateInRequiredFormat).isBefore(todayDate);
  }
};
const isMoreThanOneYearFromToday = (date) => {
  const selectedDate = moment(date.join("-"), "DD-MM-YYYY").format(
    "YYYY-MM-DD"
  );
  const todayDate = moment();
  const diff = Math.abs(todayDate.diff(selectedDate, "year"));
  if (diff > 0) {
    return true;
  } else {
    return false;
  }
};
const isDifferenceIsMoreThanOneYear = (from, to) => {
  const fromDate = moment(from.join("-"), "DD-MM-YYYY").format("YYYY-MM-DD");
  const formatToDate = moment(to.join("-"), "DD-MM-YYYY").format("YYYY-MM-DD");
  const toDate = moment(formatToDate, "YYYY-MM-DD");
  const differenceInYear = Math.abs(toDate.diff(fromDate, "year"));
  if (differenceInYear > 0) {
    return true;
  } else {
    return false;
  }
};
const isToDateBeforeFromDate = (from, to) => {
  const fromDate = moment(from.join("-"), "DD-MM-YYYY").format("YYYY-MM-DD");
  const toDate = moment(to.join("-"), "DD-MM-YYYY").format("YYYY-MM-DD");
  return moment(fromDate, "YYYY-MM-DD").isSameOrAfter(toDate);
};

const searchUsers = (searchValue, data) => {
  if (searchValue !== "") {
    const searchResult = [
      ...data.filter((item) =>
        item.UserName.toLowerCase().includes(searchValue.toLowerCase())
      ),
      ...data.filter((item) =>
        item.EmailID.toLowerCase().includes(searchValue.toLowerCase())
      ),
    ];
    return [...new Set(searchResult)];
  }
  return data;
};
export {
  getInitials,
  checkResponse,
  isDifferenceIsMoreThanOneYear,
  isSameOrBeforeToday,
  isBeforeToday,
  isMoreThanOneYearFromToday,
  isToDateBeforeFromDate,
  searchUsers,
};
