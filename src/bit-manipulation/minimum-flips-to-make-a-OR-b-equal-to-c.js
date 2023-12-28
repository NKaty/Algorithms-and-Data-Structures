// Given 3 positives numbers a, b and c. Return the minimum flips required
// in some bits of a and b to make (a OR b == c) (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change
// the bit 0 to 1 in their binary representation.

// Constraints:
// 1 <= a <= 10 ^ 9
// 1 <= b <= 10 ^ 9
// 1 <= c <= 10 ^ 9

// For example, a = 2, b = 6, c = 5
// a     0010
// b     0110
// c     0101
// flips 0021 --> 3
const findMinFlips = (a, b, c) => {
  let mask = 1;
  let minFlips = 0;

  // We iterate over every bit
  for (let i = 0; i < 32; i++) {
    // We check if the bit set in c
    // If the bit is not set in c
    if (!(mask & c)) {
      // We must not have this bit set either in a or in b
      if (mask & a) minFlips += 1;
      if (mask & b) minFlips += 1;
    // If the bit set in c
    } else {
      // We must have this bit set in at list one number (a or b)
      if (!(mask & a) && !(mask & b)) minFlips += 1;
    }

    mask = mask << 1;
  }

  return minFlips;
};

console.log(findMinFlips(2, 6, 5)); // 3
console.log(findMinFlips(245, 120, 1290)); // 12

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

// For example, a = 2, b = 6, c = 5
// a == 0010, b == 0110, c == 0101
// a | b == 0110
// (a | b) ^ c == 0110 ^ 0101 == 0011
// 0011 + 0010 & 0110 & 0011 == 0011 + 0010 == 2 bits + 1 bit == 3 flips
const findMinFlipsHammingWeight = (a, b, c) => {
  // We find the OR of a and b with no flips made
  // We find the difference between the OR and c
  const diff = (a | b) ^ c;
  // Then we find out how many bits the current OR and c differ by,
  // and we correct this number in case we need to make flips
  // in both a and b (the case when the bit is set in a and b,
  // but it must not be set in c)
  return countBits(diff) + countBits(a & b & diff);
};

console.log(findMinFlipsHammingWeight(2, 6, 5)); // 3
console.log(findMinFlipsHammingWeight(245, 120, 1290)); // 12
