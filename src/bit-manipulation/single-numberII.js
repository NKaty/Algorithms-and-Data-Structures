// Given an integer array nums where every element appears
// three times except for one, which appears exactly once.
// Find the single element and return it.
// Your algorithm should have a linear runtime complexity.
// Could you implement it without using extra memory?

// Constraints:
// 1 <= nums.length <= 3 * 10 ^ 4
// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1
// Each element in nums appears exactly three times except
// for one element which appears once.

const findSingleNumber = (nums) => {
  if (!nums.length) throw new Error('The array is empty.');

  let singleNumber = 0;
  let mask = 1;

  // We iterate over every bit
  for (let i = 0; i < 32; i++) {
    let count = 0;

    // And we count how many numbers have this bit set to 1
    for (const num of nums) {
      count += num & mask;
    }

    // If the number of such numbers is not divisible by 3,
    // it means the single number has this bit set to 1
    if (count % 3) singleNumber |= mask;
    mask <<= 1;
  }

  return singleNumber;
};

console.log(findSingleNumber([0, 1, 0, 1, 0, 1, 99])); // 99
console.log(findSingleNumber([-10, 2, 1, 6, 2, 1, 6, 2, 1, -10, 6, -8, -10])); // -8
