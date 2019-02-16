// Frequency Counter - findPair
// Given an unsorted array and a number n, find if there exists a pair of elements
// in the array whose difference is n. This function should return true
// if the pair exists or false if it does not.

// Solve this with the following requirements:
// Time Complexity - O(n log n)
// Space Complexity - O(1)

function findPair(arr, num) {
  arr.sort((a, b) => a - b);

  const numAbs = Math.abs(num);
  let i = 0;
  let j = 1;

  while (j < arr.length) {
    const diffAbs = Math.abs(arr[i] - arr[j]);

    if (diffAbs === numAbs) return true;

    if (diffAbs > numAbs && i === j - 1) {
      i++;
      j++;
    } else if (diffAbs > numAbs) {
      i++;
    } else {
      j++;
    }
  }

  return false;
}

console.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true
console.log(findPair([4, -2, 3, 10], -6)); // true
console.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false
console.log(findPair([], 0)); // false
console.log(findPair([5, 5], 0)); // true
console.log(findPair([-4, 4], -8)); // true
console.log(findPair([-4, 4], 8)); // true
console.log(findPair([1, 3, 4, 6], -2)); // true
console.log(findPair([0, 1, 3, 4, 6], -2)); // true
console.log(findPair([-2, 5, 10, 15, 16], 0)); // false
