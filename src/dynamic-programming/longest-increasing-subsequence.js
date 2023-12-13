// Given an integer array nums, return
// the length of the longest strictly increasing subsequence
// Examples:
// [10, 9, 2, 5, 3, 7, 101, 18] -> [2, 3, 7, 101] -> 4
// [0, 1, 0, 3, 2, 3] -> [0, 1, 2, 3] -> 4
// [7, 7, 7, 7] -> [7] -> 1

// Brute Force
// Time Complexity O(2^n) - every iteration we can count with the element or without it
// Space Complexity O(n) - max recursive stack depth
function lengthOfLIS(nums) {
  function findLIS(index, prevNum) {
    if (index >= nums.length) {
      return 0;
    }
    // If the current element greater than the previous element
    const countWithCurrentNum = nums[index] > prevNum
      // We can pick it
      ? findLIS(index + 1, nums[index]) + 1
      // Otherwise we can't pick it
      : 0;
    // Even if the current element greater than the previous element
    // there is possibility that there is another subsequence
    // longer than the current subsequence
    const countWithoutCurrentNum = findLIS(index + 1, prevNum);
    return Math.max(countWithoutCurrentNum, countWithCurrentNum);
  }

  return findLIS(0, -Infinity);
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // 1

// Dynamic Programming

// Top-down approach - Memoization
// Time Complexity O(n^2)
// Space Complexity O(n)
function lengthOfLISTD(nums) {
  const memo = {};

  function findLIS(index, prevIndex) {
    if (index >= nums.length) {
      return 0;
    }
    if (memo[prevIndex]) {
      return memo[prevIndex];
    }
    const countWithoutCurrentNum = findLIS(index + 1, prevIndex);
    const countWithCurrentNum = (prevIndex === -1 || nums[index] > nums[prevIndex])
      ? findLIS(index + 1, index) + 1
      : 0;
    memo[prevIndex] = Math.max(countWithoutCurrentNum, countWithCurrentNum);
    return memo[prevIndex];
  }

  return findLIS(0, -1);
}

console.log(lengthOfLISTD([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLISTD([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLISTD([7, 7, 7, 7, 7, 7, 7])); // 1
console.log(lengthOfLISTD(Array.from(Array(2500).keys()))); // 2500

// Bottom-up approach - Tabulation
// Time Complexity O(n^2)
// Space Complexity O(n)
function lengthOfLISBU(nums) {
  const table = Array.from({ length: nums.length }).fill(1);
  let result = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        table[i] = Math.max(table[i], table[j] + 1);
        result = Math.max(result, table[i]);
      }
    }
  }
  return result;
}

console.log(lengthOfLISBU([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLISBU([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLISBU([7, 7, 7, 7, 7, 7, 7])); // 1
console.log(lengthOfLISBU(Array.from(Array(2500).keys()))); // 2500
