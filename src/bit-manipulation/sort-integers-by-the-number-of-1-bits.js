// Given an integer array arr. You have to sort the integers in the array
// in ascending order by the number of 1's in their binary representation
// and in case of two or more integers have the same number of 1's
// you have to sort them in ascending order. Return the sorted array.

// Constraints:
// 1 <= arr.length <= 500
// 0 <= arr[i] <= 10 ^ 4

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

const sortByBits = function(arr) {
  return arr.sort((a, b) => countBits(a) - countBits(b) || a - b);
};

console.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])); // [0, 1, 2, 4, 8, 3, 5, 6, 7]
console.log(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]));
// [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
