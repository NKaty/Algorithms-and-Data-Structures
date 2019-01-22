// someRecursive
// Write a recursive function called someRecursive which accepts an array and a callback.
// The function returns true if a single value in the array returns true
// when passed to the callback. Otherwise it returns false.

function someRecursive(arr, cb) {
  if (!arr.length) return false;

  if (!cb(arr[0])) return someRecursive(arr.slice(1), cb);

  return true;
}

console.log(someRecursive([1, 2, 3, 4], val => val % 2 !== 0)); // true
console.log(someRecursive([4, 6, 8, 9], val => val % 2 !== 0)); // true
console.log(someRecursive([4, 6, 8], val => val % 2 !== 0)); // false
console.log(someRecursive([4, 6, 8], val => val > 10)); // false
