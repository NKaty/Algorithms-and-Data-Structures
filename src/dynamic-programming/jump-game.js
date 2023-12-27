// You are given an integer array nums.
// You are initially positioned at the array's first index,
// and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.

// Brute Force
// Time Complexity O(2^n)
// Space Complexity O(n)
function canJumpBF(nums) {
  function jump(index) {
    if (index >= nums.length - 1) {
      return true;
    }
    for (let i = 1; i <= nums[index]; i++) {
      if (jump(index + i)) {
        return true;
      }
    }
    return false;
  }

  return jump(0);
}

console.log(canJumpBF([3, 0, 8, 2, 0, 0, 1])); // true
console.log(canJumpBF([3, 2, 1, 0, 4])); // false

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n)
// Space Complexity O(n)
function canJumpTD(nums) {
  const memo = {};

  function jump(index) {
    if (memo[index] !== undefined) {
      return memo[index];
    }
    if (index >= nums.length - 1) {
      return true;
    }
    for (let i = nums[index]; i >= 1; i--) {
      if (jump(index + i)) {
        memo[index] = true;
        return true;
      }
    }
    memo[index] = false;
    return false;
  }

  return jump(0);
}

console.log(canJumpTD([3, 0, 8, 2, 0, 0, 1])); // true
console.log(canJumpTD([3, 2, 1, 0, 4])); // false
console.log(canJumpTD([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true
console.log(canJumpTD([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false

// Bottom-up approach - Tabulation
// Time Complexity O(n)
// Space Complexity O(n)
function canJumpBU(nums) {
  const table = Array.from({ length: nums.length }).fill(false);
  table[nums.length - 1] = true;
  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = 1; j <= nums[i]; j++) {
      if (table[i + j]) {
        table[i] = true;
        break;
      }
    }
  }
  return table[0];
}

console.log(canJumpBU([3, 0, 8, 2, 0, 0, 1])); // true
console.log(canJumpBU([3, 2, 1, 0, 4])); // false
console.log(canJumpBU([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true
console.log(canJumpBU([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false

// Greedy algorithm
// Time Complexity O(n)
// Space Complexity O(1)
function canJumpGA(nums) {
  let maxIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    // Keep the max index that we can reach so far
    maxIndex = Math.max(maxIndex, nums[i] + i);
    if (maxIndex >= nums.length - 1) {
      return true;
    }
    if (nums[i] === 0 && maxIndex <= i) {
      return false;
    }
  }
  return false;
}

console.log(canJumpGA([3, 0, 8, 2, 0, 0, 1])); // true
console.log(canJumpGA([3, 2, 1, 0, 4])); // false
console.log(canJumpGA([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true
console.log(canJumpGA([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false

// Optimization (mix of tabulation + greedy ???)
// Time Complexity O(n)
// Space Complexity O(1)
function canJumpOpt(nums) {
  let previousIndex = nums.length - 1;
  // Start from the end
  for (let i = previousIndex - 1; i >= 0; i--) {
    // Check if we can reach previous number
    if (nums[i] + i >= previousIndex) {
      previousIndex = i;
    }
  }
  return previousIndex === 0;
}

console.log(canJumpOpt([3, 0, 8, 2, 0, 0, 1])); // true
console.log(canJumpOpt([3, 2, 1, 0, 4])); // false
console.log(canJumpOpt([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true
console.log(canJumpOpt([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false
