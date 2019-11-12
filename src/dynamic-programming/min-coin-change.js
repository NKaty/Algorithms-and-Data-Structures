// Write a function called minCoinChange which accepts two parameters:
// an array of coins and a amount. The function should return
// the minimum number of coins needed to make the change.
// Use Dynamic Programming approach and greedy algorithm.

// Brute Force
// Time Complexity exponential
function minCoinChangeBF(coins, amount) {
  if (amount === 0) return 0;

  let result = Infinity;

  for (const coin of coins) {
    if (coin <= amount) {
      const currentResult = minCoinChangeBF(coins, amount - coin);

      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);
    }
  }

  return result;
}

console.log(minCoinChangeBF([9, 6, 5, 1], 12)); // 2
console.log(minCoinChangeBF([10, 25], 85)); // 4

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(amount * coins.length)
// Space Complexity O(amount * coins.length)
function minCoinChangeTD(coins, amount, memo = {}) {
  if (amount === 0) return 0;

  if (memo[amount]) return memo[amount];

  let result = Infinity;

  for (const coin of coins) {
    if (coin <= amount) {
      const currentResult = minCoinChangeTD(coins, amount - coin, memo);

      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);
    }
  }

  memo[amount] = result;

  return result;
}
console.log(minCoinChangeTD([9, 6, 5, 1], 20000)); // 2223
console.log(minCoinChangeTD([10, 25], 85)); // 4

// Bottom-up approach - Tabulation
// Time Complexity O(amount * coins.length)
// Space Complexity O(amount * coins.length)
function minCoinChangeBU (coins, amount) {
  const count = Array.from({ length: amount + 1 }).fill(Infinity);
  const usedCoins = Array.from({ length: amount + 1 }).fill(-1);
  count[0] = 0;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      if (count[j] > count[j - coins[i]] + 1) {
        count[j] = count[j - coins[i]] + 1;
        usedCoins[j] = coins[i];
      }
    }
  }

  if (count[amount] === Infinity) return { coins: [], minNumberOfCoins: null };

  const coinsResult = [];
  let currentIndex = amount;

  while (currentIndex > 0 && usedCoins[currentIndex] !== -1) {
    coinsResult.push(usedCoins[currentIndex]);
    currentIndex = currentIndex - usedCoins[currentIndex];
  }

  return { coins: coinsResult, minNumberOfCoins: count[amount] };
}

console.log(minCoinChangeBU([10, 25], 135)); // { coins: [ 25, 25, 25, 25, 25, 10 ], minNumberOfCoins: 6 }
console.log(minCoinChangeBU([1, 5, 6, 9], 11)); // { coins: [ 6, 5 ], minNumberOfCoins: 2 }

// greedy algorithm
// Time Complexity O(amount)
function minCoinChangeGA(coins, amount) {
  const result = [];
  coins.sort((a, b) => a - b);

  for (let i = coins.length - 1; i >= 0; i--) {
    while (amount >= coins[i]) {
      result.push(coins[i]);
      amount -= coins[i];
    }
  }

  if (amount) return null;
  return result;
}

console.log(minCoinChangeGA([10, 25], 85)); // [ 25, 25, 25, 10 ]
console.log(minCoinChangeGA([1, 2, 5, 10, 20, 50, 100], 70)); // [ 50, 20 ]

// greedy algorithm does not always work properly
console.log(minCoinChangeGA([1, 5, 6, 9], 11)); // [ 9, 1, 1 ] - instead of [6, 5]
