// Given a non-empty array of integers nums,
// every element appears twice except for one. Find that single one.
// Could you implement a solution with a linear runtime complexity
// and without using extra memory?

// Constraints:
// 1 <= nums.length <= 3 * 10 ^ 4
// -3 * 10 ^ 4 <= nums[i] <= 3 * 10 ^ 4
// Each element in the array appears twice except for one element
// which appears only once.

const singleNumber = (nums) => {
  if (!nums.length) throw new Error('The array is empty');

  // We use the fact that n ^ n will be 0
  // We XOR all the numbers and get the single number as a result
  return nums.reduce((singleNum, num) => singleNum ^ num, 0);
};

console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([-1, 10, 2, 7, 5, -100, 7, -100, -1, 5, 45, 11, 45, 10, 2])); // 11
console.log(singleNumber([5])); // 5
