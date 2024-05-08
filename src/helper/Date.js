function isLeapYear(year) {
  /*
    Check if a year is a leap year
    */
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function dayOfYear(day, month, year) {
  /*
    Calculate the day of the year for a given date
    */
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  if (isLeapYear(year)) {
    daysInMonth[2] = 29;
  }
  const mod = year % 2024;
  const yearHashing = (365 + isLeapYear(year - 1)) * mod;
  const dayOfYear =
    daysInMonth.slice(0, month).reduce((acc, val) => acc + val, 0) + day;
  return yearHashing + dayOfYear;
}

export function findDayMonthYear() {
  const currentDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const dateParts = currentDate.split("/");
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  return { day, month, year };
}

export function currentIndianDate() {
  const { day, month, year } = findDayMonthYear();
  const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return dateString;
}

export default dayOfYear;
