// A company decides that whenever Xmas falls on a Sunday
// they will give their workers all extra paid holidays so that,
// together with any public holidays, workers will not have to work
// the following week (between the 25th of December and the first of January).
// Write a function that takes a start year and an end year and return
// an array of all the years where the 25th of December will be a Sunday.

function findXmasSunday (start, end) {
  const result = [];

  for (let year = start; year <= end; year++) {
    if (new Date(year, 11, 25).getDay() === 0) result.push(year);
  }

  return result;
}

console.log(findXmasSunday(2008, 2121));
// [ 2011, 2016, 2022, 2033, 2039, 2044, 2050, 2061, 2067, 2072, 2078, 2089, 2095, 2101, 2107, 2112, 2118 ]
console.log(findXmasSunday(1977, 2016)); // [ 1977, 1983, 1988, 1994, 2005, 2011, 2016 ]
