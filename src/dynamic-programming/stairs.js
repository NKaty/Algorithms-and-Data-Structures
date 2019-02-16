// Write a function called stairs which accepts n number of stairs.
// Imagine that a person is standing at the bottom of the stairs and wants
// to reach the top and the person can climb either 1 stair or 2 stairs at a time.
// Your function should return the number of ways the person can reach the top
// by only climbing 1 or 2 stairs at a time.
// Use Dynamic Programming approach.

// Brute Force
// Time Complexity O(2^n)
function stairsBF(num) {
  if (num < 3) return num;
  return stairsBF(num - 1) + stairsBF(num - 2);
}

console.log(stairsBF(7)); // 21

// Dynamic Programming
// Time Complexity O(n)

// Top-down approach - Memoization
function stairsTD(num, cache = {}) {
  if (typeof cache[num] !== 'undefined') return cache[num];
  if (num < 3) return num;

  cache[num] = stairsTD(num - 1, cache) + stairsTD(num - 2, cache);

  return cache[num];
}

console.log(stairsTD(7)); // 21

// With a memoization function (does memoization between calls)
function memoize(fn) {
  const cache = {};

  return function(arg) {
    if (typeof cache[arg] !== 'undefined') return cache[arg];

    cache[arg] = fn.call(this, arg);

    return cache[arg];
  };
}

const memStairs = memoize(stairsTDFunc);

function stairsTDFunc(num) {
  if (num < 3) return num;

  return memStairs(num - 1) + memStairs(num - 2);
}

console.log(stairsTDFunc(7)); // 21

// Bottom-up approach - Tabulation
function stairsBU(num) {
  if (num < 3) return num;

  let prevNumber = 1;
  let currentNumber = 1;
  let temp;

  for (let i = 2; i <= num; i++) {
    temp = currentNumber;
    currentNumber += prevNumber;
    prevNumber = temp;
  }

  return currentNumber;
}

console.log(stairsBU(7)); // 21
