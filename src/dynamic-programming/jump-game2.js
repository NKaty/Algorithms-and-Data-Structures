// You are given a 0-indexed array of integers nums of length n.
// You are initially positioned at nums[0].
// Each element nums[i] represents the maximum length
// of a forward jump from index i. In other words, if you are at nums[i],
// you can jump to any nums[i + j] where: 0 <= j <= nums[i] and i + j < n.
// Return the minimum number of jumps to reach nums[n - 1].
// The test cases are generated such that you can reach nums[n - 1].

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function jumpBF(nums) {
  function jump(index) {
    if (index >= nums.length - 1) {
      return 0;
    }
    let minCount = Infinity;
    for (let i = 1; i <= nums[index]; i++) {
      minCount = Math.min(minCount, jump(index + i) + 1);
    }
    return minCount;
  }

  return jump(0);
}

console.log(jumpBF([3, 0, 8, 2, 0, 0, 1])); // 2
console.log(jumpBF([2, 3, 0, 1, 4])); // 2

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function jumpTD(nums) {
  const memo = {};

  function jump(index) {
    if (memo[index] !== undefined) {
      return memo[index];
    }
    if (index >= nums.length - 1) {
      return 0;
    }
    let minCount = Infinity;
    for (let i = nums[index]; i >= 1; i--) {
      minCount = Math.min(minCount, jump(index + i) + 1);
    }
    memo[index] = minCount;
    return minCount;
  }

  return jump(0);
}

console.log(jumpTD([3, 0, 8, 2, 0, 0, 1])); // 2
console.log(jumpTD([2, 3, 0, 1, 4])); // 2
console.log(jumpTD([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,
  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(n)
function jumpBU(nums) {
  const table = Array.from({ length: nums.length }).fill(Infinity);
  table[nums.length - 1] = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = 1; j <= nums[i]; j++) {
      table[i] = Math.min(table[i], table[i + j] + 1 || Infinity);
    }
  }
  return table[0];
}

console.log(jumpBU([3, 0, 8, 2, 0, 0, 1])); // 2
console.log(jumpBU([2, 3, 0, 1, 4])); // 2
console.log(jumpBU([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,
  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5

// Greedy algorithm
// Time Complexity O(n)
// Space Complexity O(1)
function jumpGA(nums) {
  let maxIndex = 0;
  let currentIndex = 0;
  let jumps = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    maxIndex = Math.max(maxIndex, nums[i] + i);
    if (i === currentIndex) {
      jumps++;
      currentIndex = maxIndex;
    }
  }
  return jumps;
}

console.log(jumpGA([3, 0, 8, 2, 0, 0, 1])); // 2
console.log(jumpGA([2, 3, 0, 1, 4])); // 2
console.log(jumpGA([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,
  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5
