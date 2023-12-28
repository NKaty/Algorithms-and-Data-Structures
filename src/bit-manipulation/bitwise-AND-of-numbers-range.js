// Given two integers left and right that represent the range [left, right],
// return the bitwise AND of all numbers in this range, inclusive.

// Constraints:
// 0 <= left <= right <= 2 ^ 31 - 1

const rangeBitwiseAnd = (left, right) => {
  let count = 0;

  // If we look at the binary representation of numbers, we can make three observations.
  // First, a bit will be set in the result, if this bit is set in all numbers in the range
  // For example: 100 101 110 111 --> result of & will be 100
  // Second, the least significant bits change the way often than the most significant
  // For example: 100 101 110 111 --> 1**
  // Third, if the pattern of the most significant bits is matches in the right
  // and left numbers, then it will also match in all the numbers in the range between them
  // For example: 101000 101001 101010 101011 101100 --> 101***
  // So we can get rid of the right bits in the left and right numbers
  // until they become equal or the left number becomes 0
  while (left && left !== right) {
    left >>= 1;
    right >>= 1;
    count++;
  }

  // We put the common bits back in place
  return left << count;
};

console.log(rangeBitwiseAnd(100, 126)); // 96
console.log(rangeBitwiseAnd(100, 128)); // 0

// Brian Kernighan's algorithm
const rangeBitwiseAndBrianKernighan = (left, right) => {
  // All of the above observations can be applied here as well
  // We can even add the fourth observation: & of the range of numbers will always
  // produce a number less than or equal to the left (the smallest) number
  // For example: 11001 11010 11011 11100 --> 11000 (less than 11001)
  // So we get rid of the right bits of the right number until it becomes
  // less than or equal to the left number
  while (right > left) {
    // n & (n - 1) flips the least significant bit to 0
    right &= right - 1;
  }

  return right;
};

console.log(rangeBitwiseAndBrianKernighan(100, 126)); // 96
console.log(rangeBitwiseAndBrianKernighan(100, 128)); // 0
