// Write a program to find the mode value of a collection.
// The case where the collection is empty may be ignored.
// Care must be taken to handle the case where the mode is non-unique.
// If it is not appropriate or possible to support a general collection,
// use a vector (array), if possible. If it is not appropriate or possible
// to support an unspecified value type, use integers.

function mode (arr) {
  const counter = new Map();
  const counterArray = [];

  arr.forEach(item => {
    const count = counter.get(item);
    if (count) counter.set(item, count + 1);
    else counter.set(item, 1);
  });

  counter.forEach((value, key) => counterArray.push([key, value]));
  const maxFreq = counterArray.reduce((acc, item) => Math.max(acc, item[1]), 0);

  return counterArray.filter(item => item[1] === maxFreq).map(item => item[0]);
}

console.log(mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17])); // [ 6 ]
console.log(mode([1, 2, 4, 4, 1])); // [ 1, 4 ]
console.log(mode([true, false, true, false, true, true])); // [ true ]
