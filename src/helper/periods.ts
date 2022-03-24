// Function to get all periods between the start of the data and today
export const getPeriods = (start_year = 2001) => {
  const curr_date = new Date();
  let curr_year = curr_date.getFullYear();

  // Make sure the start date is an odd year
  if (start_year % 2 == 0) {
    start_year = start_year - 1;
  }
  // Make sure the curr year is an even year
  if (curr_year % 2 !== 0) {
    curr_year = curr_year + 1;
  }

  // Find all electoral periods in between these years
  const periods = [];
  let next_year;
  while (start_year < curr_year) {
    next_year = start_year + 1;
    periods.push(start_year.toString() + "-" + next_year.toString());
    start_year += 2;
  }

  return periods;
};
