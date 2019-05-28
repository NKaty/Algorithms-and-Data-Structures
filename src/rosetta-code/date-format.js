// Return an array with the current date in the formats:
// - 2007-11-23 and
// - Sunday, November 23, 2007
// Example output: ['2007-11-23', 'Sunday, November 23, 2007']

function getDateFormats () {
  const daysCollection = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsCollection = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const result = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  result[0] = `${year}-${month + 1}-${day}`;
  result[1] = `${daysCollection[date.getDay()]}, ${monthsCollection[month]} ${day}, ${year}`;

  return result;
}

console.log(getDateFormats()); // [ '2019-5-29', 'Wednesday, May 29, 2019' ]

function getDateFormatsWithZero () {
  const daysCollection = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsCollection = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const result = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = ('0' + date.getDate()).slice(-2);

  result[0] = `${year}-${('0' + (month + 1)).slice(-2)}-${day}`;
  result[1] = `${daysCollection[date.getDay()]}, ${monthsCollection[month]} ${day}, ${year}`;
  return result;
}

console.log(getDateFormatsWithZero()); // [ '2019-05-29', 'Wednesday, May 29, 2019' ]
