// You are given an integer array cost where cost[i] is
// the cost of ith step on a staircase.
// Once you pay the cost, you can either climb one or two steps.
// You can either start from the step with index 0, or the step with index 1.
// Return the minimum cost to reach the top of the floor.

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function minCostClimbingStairsBF(cost) {
  function climb(index) {
    if (index >= cost.length) {
      return 0;
    }
    return Math.min(climb(index + 2), climb(index + 1)) + cost[index];
  }

  return Math.min(climb(1), climb(0));
}

console.log(minCostClimbingStairsBF([10, 15, 20])); // 15
console.log(minCostClimbingStairsBF([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function minCostClimbingStairsTD(cost) {
  const memo = {};

  function climb(index) {
    if (memo[index] !== undefined) {
      return memo[index];
    }
    if (index >= cost.length) {
      return 0;
    }
    memo[index] = Math.min(climb(index + 2), climb(index + 1)) + cost[index];
    return memo[index];
  }

  return Math.min(climb(1), climb(0));
}

console.log(minCostClimbingStairsTD([10, 15, 20])); // 15
console.log(minCostClimbingStairsTD([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
console.log(minCostClimbingStairsTD([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,
  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,
  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(n)
function minCostClimbingStairsBU(cost) {
  const table = Array.from({ length: cost.length }).fill(0);
  table[0] = cost[0];
  table[1] = cost[1];
  for (let i = 2; i < cost.length; i++) {
    table[i] = Math.min(table[i - 1], table[i - 2]) + cost[i];
  }
  return Math.min(table[cost.length - 1], table[cost.length - 2]);
}

console.log(minCostClimbingStairsBU([10, 15, 20])); // 15
console.log(minCostClimbingStairsBU([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
console.log(minCostClimbingStairsBU([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,
  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,
  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380
