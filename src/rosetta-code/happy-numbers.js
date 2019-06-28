// A happy number is defined by the following process:
// Starting with any positive integer, replace the number by the sum
// of the squares of its digits, and repeat the process until the number
// equals 1 (where it will stay), or it loops endlessly in a cycle
// which does not include 1. Those numbers for which this process ends
// in 1 are happy numbers, while those that do not end in 1 are unhappy numbers.
// Implement a function that returns true if the number is happy, or false if not.
// Implement a function that finds and prints the first 8 happy numbers.

function happy (num) {
  let n = num;
  const numbers = {};

  while (true) {
    n = `${n}`.split('').reduce((acc, item) => acc + Math.pow(parseInt(item, 10), 2), 0);

    if (n === 1) return true;
    if (numbers[n]) return false;

    numbers[n] = true;
  }
}

console.log(happy(32)); // true
console.log(happy(33)); // false

function sequenceOfHappyNumbers(len) {
  const result = [];
  let count = 0;

  while (result.length < len) {
    if (happy(++count)) result.push(count);
  }

  return result;
}

console.log(sequenceOfHappyNumbers(8)); // [ 1, 7, 10, 13, 19, 23, 28, 31 ]
