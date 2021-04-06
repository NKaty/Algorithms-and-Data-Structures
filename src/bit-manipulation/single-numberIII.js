// Given an integer array nums, in which exactly two elements appear
// only once and all the other elements appear exactly twice.
// Find the two elements that appear only once.
// You can return the answer in any order.
// Your algorithm should run in linear runtime complexity.
// Could you implement it using only constant space complexity?

// Constraints:
// 2 <= nums.length <= 3 * 10 ^ 4
// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1
// Each integer in nums will appear twice, only two integers will appear once.

const singleNumber = (nums) => {
  let xor = 0;
  // We use the fact that n ^ n will be 0
  // We XOR all the numbers and get the XOR of two single numbers as a result
  // For example [1, 2, 1, 3, 2, 5] - [001, 010, 001, 011, 010, 101]
  // XOR of all the numbers will be 110 == 011 ^ 101
  for (const num of nums) {
    xor ^= num;
  }

  // Now we have to find the way to separate these two single numbers
  // We know, that in order to be set in xor the bit has to be set
  // only in one of the single numbers. So we can use this fact.
  // We can take any bit in xor set to 1 as a mask
  // to divide all the numbers in the array into two groups:
  // one that has this bit set, another that doesn't
  // It is easy to take the least significant bit set to 1: xor & -xor
  // In our example: the mask will be 010
  const mask = xor & -xor;
  let first = 0;

  // So we check all the numbers and if they have this bit set
  // we XOR these numbers and get the first single number as a result
  // We could also XOR all the number from the second group and
  // get the second number: else second ^= num
  // But knowing the first number and xor of two numbers
  // we can just XOR the first number and xor to get the second number
  // In our example:
  // the first group - 010 ^ 011 ^ 010 == 011 - our first number
  // the second group - 001 ^ 001 ^ 101 == 101 or 011 ^ 110 - our second number
  for (const num of nums) {
    if (num & mask) first ^= num;
  }

  return [first, first ^ xor];
};

console.log(singleNumber([1, 2, 1, 3, 2, 5])); // [3, 5]
console.log(singleNumber([1, 5, -1, 10, 2, 1, 3, 2, 5, 10])); // [-1, 3]
console.log(singleNumber([-1, 0])); // [-1, 0]
