// Implement a function which takes a positive integer representing
// a duration in seconds as input (e.g., 100), and returns a string
// which shows the same duration decomposed into weeks, days, hours,
// minutes, and seconds as detailed below (e.g., "1 min, 40 sec").

function convertSeconds (sec) {
  const timeCollections = {
    sec: 1,
    min: 60,
    hr: 60 * 60,
    d: 24 * 60 * 60,
    wk: 7 * 24 * 60 * 60
  };
  const abbrs = ['wk', 'd', 'hr', 'min', 'sec'];

  return abbrs.reduce((duration, item) => {
    const value = Math.floor(sec / timeCollections[item]);
    sec -= value * timeCollections[item];

    if (value) duration.push(`${value} ${item}`);

    return duration;
  }, []).join(', ');
}

console.log(convertSeconds(7259)); // 2 hr, 59 sec
console.log(convertSeconds(86400)); // 1 d
console.log(convertSeconds(600000)); // 9 wk, 6 d, 10 hr, 40 min
