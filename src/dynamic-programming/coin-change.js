// Write a function called coinChange which accepts two parameters:
// an array of denominations and a value. The function should return the number
// of ways you can obtain the value from the given collection of denominations.
// You can think of this as figuring out the number of ways to make change
// for a given value from a supply of coins.
// Use Dynamic Programming approach.

// Brute Force
// Time Complexity exponential
// Space Complexity O(1)
function coinChangeBF(denominations, value) {
  const index = denominations.length - 1;

  function change(denominations, value, index) {
    if (value < 0 || index < 0) return 0;
    if (value === 0) return 1;

    return change(denominations, value - denominations[index], index) +
      change(denominations, value, index - 1);
  }

  return change(denominations, value, index);
}

console.log(coinChangeBF([1, 5, 10, 25], 100)); // 242

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(value * denominations.length)
// Space Complexity O(value * denominations.length)
function coinChangeTD(denominations, value) {
  const index = denominations.length - 1;
  const memo = {};

  function change(denominations, value, index) {
    if (value < 0 || index < 0) return 0;
    if (value === 0) return 1;

    const key = `${index}/${value}`;

    if (memo[key]) return memo[key];

    memo[key] = change(denominations, value - denominations[index], index) +
      change(denominations, value, index - 1);

    return memo[key];
  }

  return change(denominations, value, index);
}

console.log(coinChangeTD([1, 5, 10, 25], 14511)); // 409222339

// Bottom-up approach - Tabulation
// Time Complexity Complexity O(value * denominations.length)
// Space Complexity O(value)
function coinChangeBU(denominations, value) {
  const table = Array.from({ length: value + 1 }).fill(0);
  table[0] = 1;

  for (let i = 0; i < denominations.length; i++) {
    for (let j = denominations[i]; j <= value; j++) {
      table[j] += table[j - denominations[i]];
    }
  }

  return table[value];
}

console.log(coinChangeBU([1, 5, 10, 25], 14511)); // 409222339
