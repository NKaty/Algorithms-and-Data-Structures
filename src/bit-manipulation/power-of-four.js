// Given an integer n, return true if it is a power of four.
// Otherwise, return false. An integer n is a power of four,
// if there exists an integer x such that n == 4 ^ x.
// Could you solve it without loops/recursion?

// Constraints:
// -2 ^ 31 <= n <= 2 ^ 31 - 1

const isPowerOfFour = (n) => {
  if (n <= 0) return false;
  // The left part checks if n is a power of two
  // The right part checks if n is also a power of four
  // 0x55555555 - 01010101010101010101010101010101
  return !(n & (n - 1)) && !!(0x55555555 & n);
};

console.log(isPowerOfFour(1024)); // true
console.log(isPowerOfFour(2048)); // false
console.log(isPowerOfFour(-16)); // false
