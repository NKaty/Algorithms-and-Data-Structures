// fib
// Write a recursive function called fib which accepts a number
// and returns the nth number in the Fibonacci sequence using Dynamic Programming approach.
// Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ...
// which starts with 1 and 1, and where every number thereafter
// is equal to the sum of the previous two numbers.

// Brute Force
// Time Complexity O(2^n)
function fibBF(num) {
  if (num < 2) return num;

  return fibBF(num - 1) + fibBF(num - 2);
}

console.log(fibBF(10)); // 55

// Dynamic Programming
// Time Complexity O(n)
// Space Complexity O(n)

// Top-down approach - Memoization
function fibTD(num, cache = {}) {
  if (typeof cache[num] !== 'undefined') return cache[num];
  if (num < 2) return num;

  cache[num] = fibTD(num - 1, cache) + fibTD(num - 2, cache);

  return cache[num];
}

console.log(fibTD(1000)); // 4.346655768693743e+208
// console.log(fibTD(10000)); // RangeError: Maximum call stack size exceeded

// With a memoization function (does memoization between calls)
function memoize(fn) {
  const cache = {};

  return function(arg) {
    if (typeof cache[arg] !== 'undefined') return cache[arg];

    cache[arg] = fn.call(this, arg);

    return cache[arg];
  };
}

const memFib = memoize(fibTDFunc);

function fibTDFunc(num) {
  if (num < 2) return num;

  return memFib(num - 1) + memFib(num - 2);
}

console.log(fibTDFunc(1000)); // 4.346655768693743e+208
// console.log(fibTDFunc(10000)); // RangeError: Maximum call stack size exceeded

// Bottom-up approach - Tabulation
// Space Complexity O(1)
function fibBU(num) {
  if (num < 2) return num;

  let prevNumber = 0;
  let currentNumber = 1;
  let temp;

  for (let i = 1; i < num; i++) {
    temp = currentNumber;
    currentNumber += prevNumber;
    prevNumber = temp;
  }

  return currentNumber;
}

console.log(fibBU(1000)); // 4.346655768693743e+208
console.log(fibBU(10000)); // Infinity

// returns a fibonacci sequence as an array
function fibBUArray(num) {
  const numbers = [1];

  for (let i = 1; i < num; i++) {
    numbers[i] = numbers[i - 1] + (numbers[i - 2] || 0);
  }

  return numbers;
}

console.log(fibBUArray(10)); // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
