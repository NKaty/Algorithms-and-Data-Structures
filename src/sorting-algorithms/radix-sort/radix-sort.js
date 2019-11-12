// Radix Sort

// Radix Sort Helper function - getDigit
// Implement a function called getDigit which accepts a positive integer and
// a position, and returns the digit in that number at the given position.
// The position reads from right to left, so the 0th position corresponds to the rightmost digit.

// Radix Sort Helper - digitCount
// Implement a function called digitCount which accepts a positive integer and
// returns the number of digits that the integer has.

// Radix Sort Helper - mostDigits
// Implement a function called mostDigits which accepts an array of integers and
// returns a count of the number of digits for the number in the array with the most digits.

// Radix Sort function - radixSort
// Write a function called radixSort which accepts an array of numbers and
// sorts them in ascending order.

function getDigit(num, i) {
  let result = Math.abs(num);

  for (let count = i; count > 0; count--) {
    result = Math.floor(result / 10);
  }

  return result % 10;
}

function digitCount(num) {
  return Math.abs(num).toString().length;
}

function mostDigits(nums) {
  let max = 0;

  for (const num of nums) {
    max = Math.max(max, digitCount(num));
  }

  return max;
}

function radixSort(nums) {
  const end = mostDigits(nums);

  for (let i = 0; i < end; i++) {
    const helperArr = Array.from({ length: 10 }, () => []);

    for (const num of nums) {
      helperArr[getDigit(num, i)].push(num);
    }

    nums = [].concat(...helperArr);
  }

  return nums;
}

console.log(radixSort([8, 6, 1, 12])); // [1, 6, 8, 12]
console.log(radixSort([10, 100, 1, 1000, 10000000])); // [1, 10, 100, 1000, 10000000]
console.log(radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
