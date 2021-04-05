// Given an integer array nums of unique elements,
// return all possible subsets (the power set).
// The solution set must not contain duplicate subsets.
// Return the solution in any order.

// Constraints:
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// All the numbers of nums are unique.

const findSubsets = function(nums) {
  const subsets = [];

  // We use i as a bitmask
  // Every iteration we add 1 to i and get a new bitmask
  // For example for [1, 2, 3]:
  // Bitmasks will be 000 001 010 011 100 101 110 111
  // We stop when i == (1 << nums.length) --> i == 1000 (or 111 + 1)
  for (let i = 0; i < (1 << nums.length); i++) {
    const subset = [];
    // For every bitmask we go through each bit
    // And if the bit is set, we add the corresponding item to the subset
    // In our example bitmask 000 means, that there are no items in the subset
    // 001 --> [3], 010 --> [2], 011 --> [2, 3], 100 --> [1], 101 --> [1, 3]
    // 110 --> [1, 2], 111 --> [1, 2, 3]
    for (let j = nums.length - 1; j >= 0; j--) {
      // For example, if bitmask == 110 --> [1, 2]
      // We check 110 & 100 == 100 - it means we add 1 to the subset
      // 110 & 010 == 010 - it means we add 2 to the sunset
      // 110 & 001 == 000 - it means we don't add 3 to the subset
      if (i & (1 << j)) subset.push(nums[nums.length - j - 1]);
    }

    subsets.push(subset);
  }

  return subsets;
};

console.log(findSubsets([1, 2, 3])); // [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];
console.log(findSubsets([1, 2, 3, 4]));
// [[], [4], [3], [3, 4], [2], [2, 4], [2, 3], [2, 3, 4], [1], [1, 4], [1, 3], [1, 3, 4], [1, 2],
// [1, 2, 4], [1, 2, 3], [1, 2, 3, 4]];

// Iterative version
const findSubsetsIterative = (nums) => {
  // We start from the empty subset
  const subsets = [[]];

  // We take each number in nums
  for (const num of nums) {
    const subset = [];

    // And we get new subsets by adding this number to every subset in the collection
    // For example [1, 2, 3]:
    // Start - [[]]
    // We take 1 --> [] + 1 --> [1] --> [[], [1]]
    // We take 2 --> [] + 2 --> [2], [1] + 2 --> [1, 2] --> [[], [1], [2], [1, 2]]
    // We take 3 --> [] + 3 --> [3], [1] + 3 --> [1, 3], [2] + 3 --> [2, 3], [1, 2] + 3 --> [1, 2, 3]
    // --> [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
    for (const item of subsets) {
      subset.push([...item, num]);
    }

    subsets.push(...subset);
  }

  return subsets;
};

console.log(findSubsetsIterative([1, 2, 3])); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
console.log(findSubsetsIterative([1, 2, 3, 4]));
// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4],
// [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];

// Recursive version
const findSubsetsRecursive = (nums) => {
  const subsets = [];

  const getSubset = (len, start = 0, subset = []) => {
    // If we reach the desired length of the subset, we add the subset to the collection
    if (subset.length === len) return subsets.push([...subset]);

    // Otherwise, we get new subsets by adding to the current subset
    // every possible number that is not in the subset yet
    // For example [1, 2, 3]:
    // Call with len == 0, doesn't make additional calls and
    // adds empty array to the collection --> [[]]
    // Call with len == 1, makes three additional calls [] -> [1], [] -> [2], [] -> [3]
    // and add the produced subsets to the collection --> [[], [1], [2], [3]]
    // Call with len == 2, makes three additional calls, and each of these calls
    // makes or tries to make additional calls:
    // So we have the following chains:
    // [] --> [1] --> [1, 2],
    //            --> [1, 3],
    //    --> [2] --> [2, 3],
    //    --> [3] --> this chain doesn't produce the result
    // Call with len == 3:
    // [] --> [1] --> [1, 2] --> [1, 2, 3],
    //            --> [1, 3] --> this chain doesn't produce the result,
    //    --> [2] --> [2, 3] --> this chain doesn't produce the result,
    //    --> [3] --> this chain doesn't produce the result,
    for (let i = start; i < nums.length; i++) {
      getSubset(len, i + 1, [...subset, nums[i]]);
    }
  };

  // For every possible length of subset we call getSubset
  for (let i = 0; i <= nums.length; i++) {
    getSubset(i);
  }

  return subsets;
};

console.log(findSubsetsRecursive([1, 2, 3])); // [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];
console.log(findSubsetsRecursive([1, 2, 3, 4]));
// // [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4],
// // [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];
