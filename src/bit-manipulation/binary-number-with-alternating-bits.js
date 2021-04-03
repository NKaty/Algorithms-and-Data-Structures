// Given a positive integer, check whether it has alternating bits: namely,
// if two adjacent bits will always have different values.

// Constraints:
// 1 <= n <= 2 ^ 31 - 1

const hasAlternatingBits = (n) => {
  // If true (n has alternating bits), we must have all 1s
  // For example - 10 has alternating bits:
  // 10 =           1010
  // n >> 1 =       0101
  // n ^ (n >> 1) = 1111
  n = n ^ (n >> 1);
  // If all 1s, n + 1 will be a power of 2 and n & (n + 1) will be 0
  // For our example - 10:
  // n ^ (n >> 1) =     01111
  // n ^ (n >> 1) + 1 = 10000
  // n & (n + 1) =      00000
  return !(n & (n + 1));
};

console.log(hasAlternatingBits(10)); // true
console.log(hasAlternatingBits(341)); // true
console.log(hasAlternatingBits(478)); // false
