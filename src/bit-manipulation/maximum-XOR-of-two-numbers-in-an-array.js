// Given an integer array nums, return the maximum result
// of nums[i] XOR nums[j], where 0 ≤ i ≤ j < n.
// Could you do this in O(n) runtime?

// Constraints:
// 1 <= nums.length <= 2 * 10 ^ 4
// 0 <= nums[i] <= 2 ^ 31 - 1

const findMaximumXOR = (nums) => {
  let maxXOR = 0;

  // We iterate over every bit
  // We start from the most significant bits,
  // because they maximize the result if we find the numbers
  // that can give us the ability to set them
  for (let i = 31; i >= 0; i--) {
    // We left shift our result to make a space for the next bit
    maxXOR <<= 1;
    const prefixes = new Set();

    // As we start from the significant bits and gradually construct
    // our number bit by bit, we only care about the left part
    // of each number up to the current bit
    for (const num of nums) {
      prefixes.add(num >> i);
    }

    // Now we iterate over every truncated number and check if there is
    // another number in the collection that satisfies the condition:
    // (maxXOR | 1) ^ the current number == another number in the collection
    // If there is such a number, we can set the current bit in the result to 1
    for (const prefix of prefixes) {
      // Here the following rule can help us:
      // If a ^ b == c, then a ^ c == b and c ^ b == a
      // We take our maxXOR, add 1 (because our goal is to maximize XOR and
      // we hope to find a number in the collection that allows us to set this bit
      // of maxXOR to 1), and xor it with the current number we are checking
      // The fact that we xor not only the current bit but all the bits we constructed
      // earlier gives us confidence that the xor operation of the found number
      // and the current number will actually result in maxXOR
      // For example [3, 10, 5, 25, 2, 8]
      // maxXOR = 0        --> 1 --> 11 --> 111 --> 1110 --> 11100 --> 28
      // (maxXOR << 1) | 1 --> 1 --> 11 --> 111 --> 1111 --> 11101
      // 00011 (3)         --> 0 --> 00 --> 000 --> 0001 --> 00011
      // 01010 (10)        --> 0 --> 01 --> 010 --> 0101 --> 01010
      // 00101 (5)         --> 0 --> 00 --> 001 --> 0010 --> 00101
      // 11001 (25)        --> 1 --> 11 --> 110 --> 1100 --> 11001
      // 00010 (2)         --> 0 --> 00 --> 000 --> 0001 --> 00010
      // 01000 (8)         --> 0 --> 01 --> 010 --> 0100 --> 01000
      if (prefixes.has((maxXOR | 1) ^ prefix)) {
        // We found such a number, and we set the current bit in the result to 1
        maxXOR += 1;
        break;
      }
    }
  }

  return maxXOR;
};

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8])); // 28
console.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])); // 127
