// Given an integer n, return true if it is a power of two.
// Otherwise, return false. An integer n is a power of two,
// if there exists an integer x such that n == 2 ^ x.
// Could you solve it without loops/recursion?

// Constraints:
// -2 ^ 31 <= n <= 2 ^ 31 - 1

const isPowerOfTwo = (n) => {
  if (n <= 0) return false;
  // A power of two has only one bit set in their binary representation
  // So, if n is a power of two, n & (n - 1) will be 0
  return !(n & (n - 1));
};

console.log(isPowerOfTwo(1024)); // true
console.log(isPowerOfTwo(127)); // false
console.log(isPowerOfTwo(-100)); // false
