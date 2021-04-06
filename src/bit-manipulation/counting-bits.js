// Given an integer num, return an array of the number of 1's
// in the binary representation of every number in the range [0, num].
// It is very easy to come up with a solution with run time O(32n).
// Can you do it in linear time O(n) and possibly in a single pass?
// Could you solve it in O(n) space complexity?
// Can you do it without using any built-in function?

// Constraints:
// 0 <= num <= 10 ^ 5

const countBits = (num) => {
  // We start from 0
  // 0 has no bits set to 1
  const bits = [0];

  // We iterate over every number in the array
  for (let i = 1; i <= num; i++) {
    // We cut off the last bit of the current number (i >> 1)
    // The number we got as a result will be less than the current number
    // and we already counted it's bits
    // So we take the number of it's bits from the resulting array and
    // add 1 if the last bit of the current number is set to 1 or 0 if not (i & 1)
    // Let's take number 1001010111 - 599, it has 6 set bits
    // Number            10010101110 - 1198 (599 * 2) has the same number of set bits == 6
    // Number            10010101111 - 1199 (599 * 2 + 1) has the same number of set bits + 1 == 7
    // For example: range [0, 5]
    // 0 --> 0 bits --> [0]
    // 1 --> 001 --> bits[000] + 001 & 001 == bits[0] + 1 == 0 + 1 --> [0, 1]
    // 2 --> 010 --> bits[001] + 010 & 001 == bits[1] + 0 == 1 + 0 --> [0, 1, 1]
    // 3 --> 011 --> bits[001] + 011 & 001 == bits[1] + 1 == 1 + 1 --> [0, 1, 1, 2]
    // 4 --> 100 --> bits[010] + 100 & 001 == bits[2] + 0 == 1 + 0 --> [0, 1, 1, 2, 1]
    // 5 --> 101 --> bits[010] + 101 & 001 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]
    bits.push(bits[i >> 1] + (i & 1));
  }

  return bits;
};

console.log(countBits(5)); // [0, 1, 1, 2, 1, 2]
console.log(countBits(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]

const countBitsFlipLastBit = (num) => {
  // We start from 0
  // 0 has no bits set to 1
  const bits = [0];

  // We iterate over every number in the array
  for (let i = 1; i <= num; i++) {
    // The similar logic works here as well
    // We flips the least-significant bit of the current number to 0
    // The number we got as a result will be less than the current number
    // and we already counted it's bits
    // So we take the number of it's bits from the resulting array and add
    // the bit we flipped - bits[i & (i - 1)] + 1
    // For example: range [0, 5]
    // 0 --> 0 bits --> [0]
    // 1 --> bits[001 & 000] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1]
    // 2 --> bits[010 & 001] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1]
    // 3 --> bits[011 & 010] + 1 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2]
    // 4 --> bits[100 & 011] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1, 2, 1]
    // 5 --> bits[101 & 100] + 1 == bits[4] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]
    bits.push(bits[i & (i - 1)] + 1);
  }

  return bits;
};

console.log(countBitsFlipLastBit(5)); // [0, 1, 1, 2, 1, 2]
console.log(countBitsFlipLastBit(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
