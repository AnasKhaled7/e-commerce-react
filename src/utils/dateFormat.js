const dateFormate = (date) =>
  date.substring(0, 10).split("-").reverse().join(" / ");

export default dateFormate;
