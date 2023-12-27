// Given an integer array nums, find the contiguous subarray
// (containing at least one number) which has the largest sum and return its sum.

// Time Complexity O(n)
// Space Complexity O(n)
function maxSubArray(nums) {
  const subArraySum = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    subArraySum.push(Math.max(nums[i] + subArraySum[i - 1], nums[i]));
  }

  return Math.max(...subArraySum);
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([-1, 0, -2])); // 0
console.log(maxSubArray([-1])); // -1

// Time Complexity O(n)
// Space Complexity O(1)
function maxSubArrayWithoutAdditionalSpace(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i] + nums[i - 1], nums[i]);
  }

  return Math.max(...nums);
}

console.log(maxSubArrayWithoutAdditionalSpace([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArrayWithoutAdditionalSpace([-1, 0, -2])); // 0
console.log(maxSubArrayWithoutAdditionalSpace([-1])); // -1
