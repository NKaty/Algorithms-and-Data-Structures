// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed,
// the only constraint stopping you from robbing each of them
// is that adjacent houses have security systems connected,
// and it will automatically contact the police
// if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house,
// return the maximum amount of money
// you can rob tonight without alerting the police.

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function robBF(nums) {
  function find(index) {
    if (index < 0) {
      return 0;
    }
    return Math.max(find(index - 1), find(index - 2) + nums[index]);
  }

  return find(nums.length - 1);
}

console.log(robBF([1, 2, 3, 1])); // 4
console.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function robTD(nums) {
  const memo = {};

  function find(index) {
    if (index < 0) {
      return 0;
    }
    if (memo[index] !== undefined) {
      return memo[index];
    }
    memo[index] = Math.max(find(index - 1), find(index - 2) + nums[index]);
    return memo[index];
  }

  return find(nums.length - 1);
}

console.log(robTD([1, 2, 3, 1])); // 4
console.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17
console.log(robTD([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,
  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,
  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240
])); // 4173

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(1)
function robBU(nums) {
  if (!nums.length) {
    return 0;
  }

  let prev = 0;
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    [current, prev] = [Math.max(current, nums[i] + prev), current];
  }
  return current;
}

console.log(robBU([1, 2, 3, 1])); // 4
console.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17
console.log(robBU([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,
  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,
  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240
])); // 4173
