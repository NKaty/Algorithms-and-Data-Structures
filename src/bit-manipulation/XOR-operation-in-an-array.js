// Given an integer n and an integer start.
// Define an array nums where nums[i] = start + 2*i (0-indexed) and n == nums.length.
// Return the bitwise XOR of all elements of nums.

// Constraints:
// 1 <= n <= 1000
// 0 <= start <= 1000
// n == nums.length

const xorOperation = (n, start) => {
  let xor = 0;

  for (let i = 0; i < n; i++) {
    const num = start + 2 * i;
    xor ^= num;
  }

  return xor;
};

console.log(xorOperation(4, 3)); // 8
console.log(xorOperation(100, 6)); // 200
