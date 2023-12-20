// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed.
// All houses at this place are arranged in a circle.
// That means the first house is the neighbor of the last one.
// Meanwhile, adjacent houses have a security system connected,
// and it will automatically contact the police
// if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house,
// return the maximum amount of money you can rob tonight without alerting the police.

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function robBF(nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  function find(fromIdx, toIdx) {
    if (fromIdx < toIdx) {
      return 0;
    }
    return Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);
  }

  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));
}

console.log(robBF([1, 2, 3, 1])); // 4
console.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function robTD(nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  const memo = {};

  function find(fromIdx, toIdx) {
    if (fromIdx < toIdx) {
      return 0;
    }
    const key = `${fromIdx}/${toIdx}`;
    if (memo[key] !== undefined) {
      return memo[key];
    }
    memo[key] = Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);
    return memo[key];
  }

  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));
}

console.log(robTD([1, 2, 3, 1])); // 4
console.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16
console.log(robTD([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,
  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,
  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(1)
function robBU(nums) {
  let prev1 = 0;
  let current1 = nums[0];

  let prev2 = 0;
  let current2 = nums[1];

  for (let i = 1; i < nums.length - 1; i++) {
    [current1, prev1] = [Math.max(current1, nums[i] + prev1), current1];
    [current2, prev2] = [Math.max(current2, nums[i + 1] + prev2), current2];
  }
  return Math.max(current1 || 0, current2 || 0);
}

console.log(robBU([1, 2, 3, 1])); // 4
console.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16
console.log(robBU([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,
  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,
  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926
