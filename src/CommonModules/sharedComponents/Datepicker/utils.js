const getDiffInDate = (a, b) => {
  if (a.length !== 0 && b.length !== 0) {
    const date1 = new Date(`${a[1]}/${a[0]}/${a[2]}`);
    const date2 = new Date(`${b[1]}/${b[0]}/${b[2]}`);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
};

export default getDiffInDate;
