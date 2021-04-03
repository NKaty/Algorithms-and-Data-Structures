// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times.
// You may assume that the majority element always exists in the array.
// Could you solve the problem in linear time and in O(1) space?

// Constraints:
// n == nums.length
// 1 <= n <= 5 * 10 ^ 4
// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1

const findMajorityElement = (nums) => {
  if (!nums.length) throw new Error('The array is empty');

  let majorityElement = 0;

  // For every bit
  for (let i = 0; i < 32; i++) {
    const mask = 1 << i;
    let bitCount = 0;

    // we count the number of numbers that have this bit
    for (const num of nums) {
      if (num & mask) bitCount++;
    }

    // If bitCount is more than n / 2, we set this bit in the result
    if (bitCount > nums.length / 2) majorityElement |= mask;
  }

  return majorityElement;
};

console.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(findMajorityElement([7, 7, -5, 7, -5, 1, -5, 7, -5, -5, 7, 7, 7, 7, 7, 7])); // 7
console.log(findMajorityElement([4])); // 4
