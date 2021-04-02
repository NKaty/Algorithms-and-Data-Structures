// Given an array nums containing n distinct numbers
// in the range [0, n], return the only number in the range
// that is missing from the array. Could you implement a solution
// using only O(1) extra space complexity and O(n) runtime complexity?

// Constraints:
// n == nums.length
// 1 <= n <= 10 ^ 4
// 0 <= nums[i] <= n
// All the numbers of nums are unique.

const findMissingNumber = (nums) => {
  let missingNumber = nums.length;

  for (let i = 0; i < nums.length; i++) {
    // Uses the fact that n ^ n will be 0
    // So we XOR every number twice (as a number in nums and as an index)
    // except the missing number (we XOR it only once as an index)
    missingNumber ^= (i ^ nums[i]);
  }

  return missingNumber;
};

console.log(findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
console.log(findMissingNumber([0])); // 1
