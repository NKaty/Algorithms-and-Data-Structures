// Given a list of arbitrarily many strings, implement
// a function for each of the following conditions:
// test if they are all lexically equal
// test if every string is lexically less than the one after it
// (i.e. whether the list is in strict ascending order)

function allEqual (arr) {
  return arr.reduce((bool, item, index) => {
    if (index === arr.length - 1) return bool;
    return bool && item === arr[index + 1];
  }, true);
}

function azSorted (arr) {
  return arr.reduce((bool, item, index) => {
    if (index === arr.length - 1) return bool;
    return bool && item < arr[index + 1];
  }, true);
}

console.log(allEqual(['AA', 'AA', 'AA', 'AA'])); // true
console.log(allEqual(['AA', 'ACB', 'BB', 'CC'])); // false
console.log(azSorted(['AA', 'ACB', 'BB', 'CC'])); // true
console.log(azSorted(['AA', 'AA', 'AA', 'AA'])); // false
